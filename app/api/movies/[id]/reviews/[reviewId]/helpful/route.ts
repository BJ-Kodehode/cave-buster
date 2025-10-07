import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import Review from "@/lib/models/review";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; reviewId: string }> }
) {
  const { userId } = await auth();
  const { reviewId } = await params;

  if (!userId) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await connectDB();

    const review = await Review.findById(reviewId);
    if (!review) {
      return NextResponse.json(
        { success: false, error: "Review not found" },
        { status: 404 }
      );
    }

    // Initialize arrays if they don't exist (for backwards compatibility)
    if (!Array.isArray(review.helpfulBy)) review.helpfulBy = [];
    if (typeof review.helpfulCount !== "number") review.helpfulCount = 0;

    const userIndex = review.helpfulBy.indexOf(userId);
    
    if (userIndex >= 0) {
      // User already liked - remove like
      review.helpfulBy.splice(userIndex, 1);
      review.helpfulCount = Math.max(0, review.helpfulCount - 1);
    } else {
      // Add like
      review.helpfulBy.push(userId);
      review.helpfulCount += 1;
    }

    await review.save();

    return NextResponse.json({
      success: true,
      data: {
        helpfulCount: review.helpfulCount,
        helpfulBy: review.helpfulBy,
        liked: userIndex < 0,
      },
    });
  } catch (error) {
    console.error("Error toggling helpful:", error);
    return NextResponse.json(
      { success: false, error: "Failed to toggle helpful" },
      { status: 500 }
    );
  }
}