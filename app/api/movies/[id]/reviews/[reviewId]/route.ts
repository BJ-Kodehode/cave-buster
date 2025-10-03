import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import Review from "@/lib/models/review";
import { updateReviewSchema } from "@/lib/validations/reviewSchema";
import type { ApiResponse, Review as ReviewType } from "@/types";

// PUT /api/movies/[id]/reviews/[reviewId] - Update a review
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; reviewId: string }> }
): Promise<NextResponse<ApiResponse<ReviewType>>> {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required",
        },
        { status: 401 }
      );
    }

    const { reviewId } = await params;
    const body = await request.json();

    // Validate the request body
    const validationResult = updateReviewSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid review data: " + validationResult.error.issues.map(i => i.message).join(", "),
        },
        { status: 400 }
      );
    }

    await connectDB();

    const review = await Review.findById(reviewId);

    if (!review) {
      return NextResponse.json(
        {
          success: false,
          error: "Review not found",
        },
        { status: 404 }
      );
    }

    // Check if user owns the review
    if (review.userId !== user.id) {
      return NextResponse.json(
        {
          success: false,
          error: "You can only update your own reviews",
        },
        { status: 403 }
      );
    }

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      validationResult.data,
      { new: true }
    ).lean();

    if (!updatedReview) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to update review",
        },
        { status: 500 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reviewData: any = updatedReview;
    const formattedReview: ReviewType = {
      _id: reviewData._id.toString(),
      movieId: reviewData.movieId.toString(),
      userId: reviewData.userId,
      reviewAuthor: reviewData.reviewAuthor,
      reviewText: reviewData.reviewText,
      rating: reviewData.rating,
      createdAt: reviewData.createdAt.toISOString(),
      updatedAt: reviewData.updatedAt.toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: formattedReview,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update review",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/movies/[id]/reviews/[reviewId] - Delete a review
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; reviewId: string }> }
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required",
        },
        { status: 401 }
      );
    }

    const { reviewId } = await params;
    await connectDB();

    const review = await Review.findById(reviewId);

    if (!review) {
      return NextResponse.json(
        {
          success: false,
          error: "Review not found",
        },
        { status: 404 }
      );
    }

    // Check if user owns the review
    if (review.userId !== user.id) {
      return NextResponse.json(
        {
          success: false,
          error: "You can only delete your own reviews",
        },
        { status: 403 }
      );
    }

    await Review.findByIdAndDelete(reviewId);

    return NextResponse.json({
      success: true,
      data: null,
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete review",
      },
      { status: 500 }
    );
  }
}
