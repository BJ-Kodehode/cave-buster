"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import MovieCard from "@/components/MovieCard";
import MovieFilters, { FilterState } from "@/components/MovieFilters";
import type { Movie } from "@/types";
import { Film } from "lucide-react";

interface HomeClientProps {
  movies: Movie[];
  userId: string | null;
}

export default function HomeClient({ movies, userId }: HomeClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    genre: "",
    sortBy: "newest",
    yearRange: [1888, new Date().getFullYear() + 5],
  });

  const availableGenres = useMemo(() => {
    const genres = new Set(movies.map((m) => m.genre));
    return Array.from(genres).sort();
  }, [movies]);

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchLower) ||
          movie.director.toLowerCase().includes(searchLower) ||
          movie.genre.toLowerCase().includes(searchLower)
      );
    }

    if (filters.genre) {
      result = result.filter((movie) => movie.genre === filters.genre);
    }

    result = result.filter(
      (movie) =>
        movie.releaseYear >= filters.yearRange[0] &&
        movie.releaseYear <= filters.yearRange[1]
    );

    // Sort
    switch (filters.sortBy) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title, "no"));
        break;
      case "title-desc":
        result.sort((a, b) => b.title.localeCompare(a.title, "no"));
        break;
      case "year-desc":
        result.sort((a, b) => b.releaseYear - a.releaseYear);
        break;
      case "year-asc":
        result.sort((a, b) => a.releaseYear - b.releaseYear);
        break;
    }

    return result;
  }, [movies, filters]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {userId && (
        <div className="flex justify-end">
          <Link
            href="/movies/new"
            className="relative group btn-primary rounded-xl px-6 sm:px-8 py-3 sm:py-4 font-semibold overflow-hidden text-sm sm:text-base"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-cool)] to-[var(--accent-neon)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              <Film className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Legg til film</span>
              <span className="sm:hidden">Ny film</span>
            </span>
          </Link>
        </div>
      )}

      {movies.length === 0 ? (
        <div className="relative text-center py-16 sm:py-20 card rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-warm)]/10 via-transparent to-[var(--accent-cool)]/10 animate-pulse" />
          <div className="relative px-4">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6">
              <Image
                src="/logo.svg"
                alt="Cave Buster"
                fill
                className="object-contain opacity-50"
              />
            </div>
            <p className="text-[var(--foreground)]/70 text-base sm:text-lg mb-6">
              Ingen filmer lagt til ennå
            </p>
            {userId && (
              <Link
                href="/movies/new"
                className="inline-block bg-gradient-to-r from-[var(--accent-warm)] to-[var(--accent-cool)] bg-clip-text text-transparent font-semibold text-base sm:text-lg hover:from-[var(--accent-cool)] hover:to-[var(--accent-neon)] transition-all"
              >
                Bli den første til å legge til en film →
              </Link>
            )}
          </div>
        </div>
      ) : (
        <>
          <MovieFilters
            onFilterChange={setFilters}
            availableGenres={availableGenres}
            totalMovies={movies.length}
            filteredCount={filteredMovies.length}
          />

          {filteredMovies.length === 0 ? (
            <div className="text-center py-12 sm:py-16 card rounded-xl px-4">
              <p className="text-[var(--foreground)]/70 text-base sm:text-lg">
                Ingen filmer matcher dine filtre
              </p>
            </div>
          ) : (
            <div className="movie-grid">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
