/*
 * File: app/page.tsx
 * Location: Main page (server-side) for the Cave Buster application
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
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[var(--foreground)] via-[var(--accent-cool)] to-[var(--accent-neon)] bg-clip-text text-transparent mb-4">
              �‍☠️ Cave Buster
            </h1>
            <p className="text-xl text-[var(--foreground)]/70">Film anmeldelse plattform</p>
          </div>
          
          <div className="card rounded-xl p-4 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--accent-warm)] mb-4">⚙️ Konfigurering påkrevd</h2>
            <p className="text-[var(--foreground)]/80 mb-6 text-sm sm:text-base">
              For å bruke Cave Buster trenger du å sette opp følgende:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[var(--accent-cool)] text-[var(--background)] rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <h3 className="font-semibold text-[var(--accent-cool)]">MongoDB Database</h3>
                  <p className="text-[var(--foreground)]/60 text-sm">Gratis på MongoDB Atlas</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[var(--accent-neon)] text-[var(--background)] rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <h3 className="font-semibold text-[var(--accent-neon)]">Clerk Authentication</h3>
                  <p className="text-[var(--foreground)]/60 text-sm">Gratis autentisering tjeneste</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 card rounded-lg">
              <h4 className="font-semibold text-[var(--accent-cool)] mb-2">📚 Instruksjoner:</h4>
              <p className="text-[var(--foreground)]/80 text-sm mb-2">
                Se <code className="bg-[var(--accent-warm)]/20 px-2 py-1 rounded text-[var(--accent-warm)]">QUICK_SETUP.md</code> eller <code className="bg-[var(--accent-warm)]/20 px-2 py-1 rounded text-[var(--accent-warm)]">SETUP.md</code> for detaljerte instruksjoner.
              </p>
              <p className="text-[var(--foreground)]/60 text-sm">
                Etter konfigurering, restart serveren med <code className="bg-[var(--accent-cool)]/20 px-2 py-1 rounded text-[var(--accent-cool)]">npm run dev</code>
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-[var(--foreground)]/50 text-xs sm:text-sm">
              Cave Buster - En fullstack film anmeldelse plattform bygget med Next.js, MongoDB og Clerk
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Attribution tekst øverst - mobile responsive */}
        <div className="text-center mb-6 sm:mb-8 p-3 sm:p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <p className="text-amber-200 text-xs sm:text-sm">
            <span className="font-semibold">The Codeburglar got his code stolen.</span> Så takk til Marcus Børresen for å låne bort koden sin
          </p>
        </div>
        
        <HomeClient movies={movies} userId={userId} />
      </div>
    </div>
  );
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
