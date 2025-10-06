import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import Movie from "@/lib/models/movie";
import { updateMovieSchema } from "@/lib/validations/movieSchema";
import type { ApiResponse } from "@/types";
// Define MovieType here without imageUrl
type MovieType = {
  _id: string;
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
  description: string;
  runtime: number;
  cast: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

// GET /api/movies/[id] - Fetch a single movie
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<MovieType>>> {
  try {
    const { id } = await params;
    await connectDB();

    const movie = await Movie.findById(id).lean();

    if (!movie) {
      return NextResponse.json(
        {
          success: false,
          error: "Movie not found",
        },
        { status: 404 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const movieData: any = movie;
    const formattedMovie: MovieType = {
      _id: movieData._id.toString(),
      title: movieData.title,
      director: movieData.director,
      releaseYear: movieData.releaseYear,
      genre: movieData.genre,
      description: movieData.description,
      runtime: movieData.runtime,
      cast: movieData.cast,
      createdBy: movieData.createdBy,
      createdAt: movieData.createdAt.toISOString(),
      updatedAt: movieData.updatedAt.toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: formattedMovie,
    });
  } catch (error) {
    console.error("Error fetching movie:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch movie",
      },
      { status: 500 }
    );
  }
}

// PUT /api/movies/[id] - Update a movie
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<MovieType>>> {
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

    const { id } = await params;
    const body = await request.json();

    // Validate the request body
    const validationResult = updateMovieSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid movie data: " + validationResult.error.issues.map(i => i.message).join(", "),
        },
        { status: 400 }
      );
    }

    await connectDB();

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

    // Check if user owns the movie
    if (movie.createdBy !== userId) {
      return NextResponse.json(
        {
          success: false,
          error: "You can only update movies you created",
        },
        { status: 403 }
      );
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      validationResult.data,
      { new: true }
    ).lean();

    if (!updatedMovie) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to update movie",
        },
        { status: 500 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const movieData: any = updatedMovie;
    const formattedMovie: MovieType = {
      _id: movieData._id.toString(),
      title: movieData.title,
      director: movieData.director,
      releaseYear: movieData.releaseYear,
      genre: movieData.genre,
      description: movieData.description,
      runtime: movieData.runtime,
      cast: movieData.cast,
      createdBy: movieData.createdBy,
      createdAt: movieData.createdAt.toISOString(),
      updatedAt: movieData.updatedAt.toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: formattedMovie,
    });
  } catch (error) {
    console.error("Error updating movie:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update movie",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/movies/[id] - Delete a movie
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized - Please sign in",
        },
        { status: 401 }
      );
    }

    const { id } = await params;
    await connectDB();

    // Find the movie first to check ownership
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

    // Check if user owns the movie
    if (movie.createdBy !== userId) {
      return NextResponse.json(
        {
          success: false,
          error: "You can only delete movies you created",
        },
        { status: 403 }
      );
    }

    // Delete the movie
    await Movie.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      data: null,
    });
  } catch (error) {
    console.error("Error deleting movie:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete movie",
      },
      { status: 500 }
    );
  }
}
