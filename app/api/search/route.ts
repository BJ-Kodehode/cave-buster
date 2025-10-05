import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Movie from "@/lib/models/movie";

export interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  url?: string;
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

    const results: SearchItem[] = movies.map((movie: any) => ({
      id: movie._id.toString(),
      title: movie.title,
      subtitle: `${movie.director} (${movie.releaseYear}) • ${movie.genre}`,
      url: `/movies/${movie._id}`
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ results: [] });
  }
}