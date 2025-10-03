/*
 * File: app/page.tsx
 * Location: Main page component (server-side) for the Cave Buster application
 */

import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import Movie from "@/lib/models/movie";
import type { Movie as MovieType } from "@/types";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

async function getMovies(): Promise<MovieType[]> {
  try {
    // Check if we're in development and missing env vars
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('placeholder')) {
      console.log("⚠️  Using placeholder data - MongoDB not configured");
      return [];
    }

    await connectDB();
    const rawMovies = await Movie.find({}).sort({ createdAt: -1 });

    return rawMovies.map((movie) => ({
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
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

export default async function Home() {
  const { userId } = await auth();
  const movies = await getMovies();

  // Show setup message if no MongoDB connection
  if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('placeholder')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-[#06b6d4] to-[#ec4899] bg-clip-text text-transparent mb-4">
              🎬 Cave Buster
            </h1>
            <p className="text-xl text-gray-400">Film anmeldelse plattform</p>
          </div>
          
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">⚙️ Konfigurering påkrevd</h2>
            <p className="text-gray-300 mb-6">
              For å bruke Cave Buster trenger du å sette opp følgende:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                <div>
                  <h3 className="font-semibold text-blue-400">MongoDB Database</h3>
                  <p className="text-gray-400 text-sm">Gratis på MongoDB Atlas</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                <div>
                  <h3 className="font-semibold text-purple-400">Clerk Authentication</h3>
                  <p className="text-gray-400 text-sm">Gratis autentisering tjeneste</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-green-400 mb-2">📚 Instruksjoner:</h4>
              <p className="text-gray-300 text-sm mb-2">
                Se <code className="bg-gray-700 px-2 py-1 rounded">QUICK_SETUP.md</code> eller <code className="bg-gray-700 px-2 py-1 rounded">SETUP.md</code> for detaljerte instruksjoner.
              </p>
              <p className="text-gray-400 text-sm">
                Etter konfigurering, restart serveren med <code className="bg-gray-700 px-2 py-1 rounded">npm run dev</code>
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-500">
              Cave Buster - En fullstack film anmeldelse plattform bygget med Next.js, MongoDB og Clerk
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <HomeClient movies={movies} userId={userId} />;
}

/*
 * This server component handles:
 * - Authentication state retrieval
 * - Database connection and error handling
 * - Environment configuration validation
 * - Fetching all movies from the database
 * - Data transformation for client consumption
 * - Setup guidance when configuration is incomplete
 * - Rendering the client-side home component
 */
