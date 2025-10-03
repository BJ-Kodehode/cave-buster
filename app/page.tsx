import { currentUser } from "@clerk/nextjs/server";
import HomeClient from "./HomeClient";
import type { Movie } from "@/types";

async function getMovies(): Promise<Movie[]> {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
    
    const response = await fetch(`${baseUrl}/api/movies`, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      console.error("Failed to fetch movies:", response.statusText);
      return [];
    }
    
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

export default async function Home() {
  const user = await currentUser();
  const movies = await getMovies();

  return <HomeClient movies={movies} userId={user?.id || null} />;
}
