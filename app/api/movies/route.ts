import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import Movie from "@/lib/models/movie";
import { movieSchema } from "@/lib/validations/movieSchema";
import type { ApiResponse, Movie as MovieType } from "@/types";

// GET /api/movies - Fetch all movies
export async function GET(): Promise<NextResponse<ApiResponse<MovieType[]>>> {
  try {
    await connectDB();
    
    const movies = await Movie.find()
      .sort({ createdAt: -1 })
      .lean();

    const formattedMovies: MovieType[] = movies.map((movie: any) => ({
      _id: movie._id.toString(),
      title: movie.title,
      director: movie.director,
      releaseYear: movie.releaseYear,
      genre: movie.genre,
      description: movie.description,
      runtime: movie.runtime,
      createdBy: movie.createdBy,
      createdAt: movie.createdAt.toISOString(),
      updatedAt: movie.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: formattedMovies,
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch movies",
      },
      { status: 500 }
    );
  }
}

// POST /api/movies - Create a new movie
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<MovieType>>> {
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

    const body = await request.json();
    
    // Validate the request body
    const validationResult = movieSchema.safeParse(body);
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

    // Check if movie with same title and director already exists
    const existingMovie = await Movie.findOne({
      title: validationResult.data.title,
      director: validationResult.data.director,
    });

    if (existingMovie) {
      return NextResponse.json(
        {
          success: false,
          error: "A movie with this title and director already exists",
        },
        { status: 409 }
      );
    }

    const movie = await Movie.create({
      ...validationResult.data,
      createdBy: user.id,
    });

    const formattedMovie: MovieType = {
      _id: movie._id.toString(),
      title: movie.title,
      director: movie.director,
      releaseYear: movie.releaseYear,
      genre: movie.genre,
      description: movie.description,
      runtime: movie.runtime,
      createdBy: movie.createdBy,
      createdAt: movie.createdAt.toISOString(),
      updatedAt: movie.updatedAt.toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        data: formattedMovie,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating movie:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create movie",
      },
      { status: 500 }
    );
  }
}
