import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedMovies: MovieType[] = movies.map((movie: any) => ({
      _id: movie._id.toString(),
      title: movie.title,
      director: movie.director,
      releaseYear: movie.releaseYear,
      genre: movie.genre,
      description: movie.description,
      runtime: movie.runtime,
      cast: movie.cast,
      imageUrl: movie.imageUrl,
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
    console.log("POST /api/movies - Starting request");
    
    const { userId } = await auth();
    console.log("User ID:", userId ? "Found" : "Not found");
    
    if (!userId) {
      console.log("Authentication failed - no userId");
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required",
        },
        { status: 401 }
      );
    }

    console.log("Parsing request body...");
    const body = await request.json();
    console.log("Request body received:", JSON.stringify(body, null, 2));
    
    // Validate the request body
    console.log("Validating with movieSchema...");
    const validationResult = movieSchema.safeParse(body);
    if (!validationResult.success) {
      console.error("Validation failed:", validationResult.error.issues);
      console.error("Received data:", body);
      return NextResponse.json(
        {
          success: false,
          error: "Invalid movie data",
          details: validationResult.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
            code: issue.code
          }))
        },
        { status: 400 }
      );
    }

    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connected successfully");

    // Check if movie with same title and director already exists
    console.log("Checking for existing movie...");
    const existingMovie = await Movie.findOne({
      title: validationResult.data.title,
      director: validationResult.data.director,
    });

    if (existingMovie) {
      console.log("Movie already exists");
      return NextResponse.json(
        {
          success: false,
          error: "A movie with this title and director already exists",
        },
        { status: 409 }
      );
    }

    console.log("Creating new movie...");
    const movie = await Movie.create({
      ...validationResult.data,
      createdBy: userId,
    });
    console.log("Movie created successfully:", movie._id);

    const formattedMovie: MovieType = {
      _id: movie._id.toString(),
      title: movie.title,
      director: movie.director,
      releaseYear: movie.releaseYear,
      genre: movie.genre,
      description: movie.description,
      runtime: movie.runtime,
      cast: movie.cast,
      imageUrl: movie.imageUrl,
      createdBy: movie.createdBy,
      createdAt: movie.createdAt.toISOString(),
      updatedAt: movie.updatedAt.toISOString(),
    };

    console.log("Returning success response");
    return NextResponse.json(
      {
        success: true,
        data: formattedMovie,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating movie:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create movie",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
