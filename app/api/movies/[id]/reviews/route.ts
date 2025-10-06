import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import Review from "@/lib/models/review";
import Movie from "@/lib/models/movie";
import { reviewSchema } from "@/lib/validations/reviewSchema";
import type { ApiResponse, Review as ReviewType } from "@/types";
import mongoose from "mongoose";

// GET /api/movies/[id]/reviews - Fetch all reviews for a movie
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<ReviewType[]>>> {
  try {
    const { id } = await params;
    await connectDB();

    // Verify movie exists
    const movie = await Movie.findById(id);
    if (!movie) {
      return NextResponse.json(
        {
          success: false,
          error: "Movie not found",
        },
        { status: 404 }
      );
    }

    const reviews = await Review.find({ movieId: id })
      .sort({ createdAt: -1 })
      .lean();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedReviews: ReviewType[] = reviews.map((review: any) => ({
      _id: review._id.toString(),
      movieId: review.movieId.toString(),
      userId: review.userId,
      reviewAuthor: review.reviewAuthor,
      reviewText: review.reviewText,
      rating: review.rating,
      createdAt: review.createdAt.toISOString(),
      updatedAt: review.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: formattedReviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch reviews",
      },
      { status: 500 }
    );
  }
}

// POST /api/movies/[id]/reviews - Create a new review
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<ReviewType>>> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required",
        },
        { status: 401 }
      );
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User information not available",
        },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    
    console.log("Review POST request body:", body);
    console.log("Movie ID:", id);

    // Validate the request body
    const validationResult = reviewSchema.safeParse(body);
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error);
      return NextResponse.json(
        {
          success: false,
          error: "Invalid review data: " + validationResult.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(", "),
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    await connectDB();

    // Verify movie exists
    const movie = await Movie.findById(id);
    if (!movie) {
      return NextResponse.json(
        {
          success: false,
          error: "Movie not found",
        },
        { status: 404 }
      );
    }

    // Check if user has already reviewed this movie
    const existingReview = await Review.findOne({
      movieId: id,
      userId: user.id,
    });

    if (existingReview) {
      return NextResponse.json(
        {
          success: false,
          error: "You have already reviewed this movie",
        },
        { status: 409 }
      );
    }

    try {
      const review = await Review.create({
        movieId: id,
        userId: user.id,
        reviewAuthor: user.firstName + " " + (user.lastName || ""),
        ...validationResult.data,
      });

      const formattedReview: ReviewType = {
        _id: review._id.toString(),
        movieId: review.movieId.toString(),
        userId: review.userId,
        reviewAuthor: review.reviewAuthor,
        reviewText: review.reviewText,
        rating: review.rating,
        createdAt: review.createdAt.toISOString(),
        updatedAt: review.updatedAt.toISOString(),
      };

      return NextResponse.json(
        {
          success: true,
          data: formattedReview,
        },
        { status: 201 }
      );
    } catch (dbError: any) {
      console.error("Database error creating review:", dbError);
      if (dbError instanceof mongoose.Error.ValidationError) {
        return NextResponse.json(
          {
            success: false,
            error: "Database validation error: " + Object.values(dbError.errors).map((e: any) => e.message).join(", "),
          },
          { status: 400 }
        );
      }
      throw dbError; // Re-throw if it's not a validation error
    }
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create review",
      },
      { status: 500 }
    );
  }
}
