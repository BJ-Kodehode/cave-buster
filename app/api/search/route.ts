import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Movie from "@/lib/models/movie";

export interface SearchItem {
  _id: string;
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
}

interface MovieDocument {
  _id: unknown;
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
  description?: string;
  cast?: string[];
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase().trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Check if we're in development and missing env vars
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('placeholder')) {
      console.log("⚠️  Using placeholder data - MongoDB not configured");
      return NextResponse.json({ results: [] });
    }

    await connectDB();
    
    // Search movies by title, director, genre, or cast
    const movies = await Movie.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { director: { $regex: q, $options: "i" } },
        { genre: { $regex: q, $options: "i" } },
        { cast: { $elemMatch: { $regex: q, $options: "i" } } },
        { description: { $regex: q, $options: "i" } }
      ]
    }).limit(12).lean();

    const results: SearchItem[] = movies.map((movie) => {
      const movieDoc = movie as unknown as MovieDocument;
      return {
        _id: String(movieDoc._id),
        title: movieDoc.title,
        director: movieDoc.director,
        releaseYear: movieDoc.releaseYear,
        genre: movieDoc.genre
      };
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ results: [] });
  }
}