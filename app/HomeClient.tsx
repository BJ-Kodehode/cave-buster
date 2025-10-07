"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import MovieCard from "@/components/MovieCard";
import MovieFilters, { FilterState } from "@/components/MovieFilters";
import type { Movie, ReviewStats, OverallStats } from "@/types";
import { Film } from "lucide-react";

interface Filters {
  genre: string;
  sortBy: 'newest' | 'oldest' | 'title' | 'rating' | 'director';
  yearRange: {
    min: string;
    max: string;
  };
  minRating: string;
  search: string;
}

interface HomeClientProps {
  movies: Movie[];
  userId: string | null;
  perMovie: ReviewStats[];
  overall: OverallStats;
}

export default function HomeClient({ movies, userId, perMovie, overall }: HomeClientProps) {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    genre: "",
    sortBy: "newest",
    yearRange: { min: "", max: "" },
    minRating: "",
  });

  const handleFilterChange = (filterState: FilterState) => {
    // Convert sortBy values from MovieFilters format to HomeClient format
    let sortBy: Filters['sortBy'] = "newest";
    switch (filterState.sortBy) {
      case "year-desc":
      case "newest":
        sortBy = "newest";
        break;
      case "year-asc":
      case "oldest":
        sortBy = "oldest";
        break;
      case "title-asc":
      case "title-desc":
        sortBy = "title";
        break;
      case "rating-desc":
      case "rating-asc":
        sortBy = "rating";
        break;
      default:
        sortBy = "newest";
    }

    const convertedFilters: Filters = {
      search: filterState.search || "",
      genre: filterState.genre || "",
      sortBy,
      yearRange: {
        min: filterState.yearRange ? filterState.yearRange[0].toString() : "",
        max: filterState.yearRange ? filterState.yearRange[1].toString() : "",
      },
      minRating: filterState.minRating || "",
    };
    setFilters(convertedFilters);
  };

  const availableGenres = useMemo(() => {
    const genres = new Set(movies.map((m) => m.genre));
    return Array.from(genres).sort();
  }, [movies]);

  // Create stats map for quick lookup
  const statsMap = useMemo(() => {
    const map = new Map<string, ReviewStats>();
    perMovie.forEach((stat) => map.set(stat.movieId, stat));
    return map;
  }, [perMovie]);

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

    // Filter by year range
    if (filters.yearRange.min || filters.yearRange.max) {
      result = result.filter((movie) => {
        const minYear = filters.yearRange.min ? parseInt(filters.yearRange.min) : 0;
        const maxYear = filters.yearRange.max ? parseInt(filters.yearRange.max) : 9999;
        return movie.releaseYear >= minYear && movie.releaseYear <= maxYear;
      });
    }

    // Filter by minimum rating
    if (filters.minRating) {
      const minRating = parseFloat(filters.minRating);
      result = result.filter((movie) => {
        const movieStats = statsMap.get(movie._id);
        return movieStats && movieStats.avgRating && movieStats.avgRating >= minRating;
      });
    }

    // Sort with enhanced options
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
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title, "no"));
        break;
      case "rating":
        result.sort((a, b) => {
          const aStats = statsMap.get(a._id);
          const bStats = statsMap.get(b._id);
          const aRating = aStats?.avgRating || 0;
          const bRating = bStats?.avgRating || 0;
          return bRating - aRating; // Highest rating first
        });
        break;
      case "director":
        result.sort((a, b) => a.director.localeCompare(b.director, "no"));
        break;
    }

    return result;
  }, [movies, filters, statsMap]);

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
        <div className="relative text-center py-16 sm:py-20 bg-[var(--card-bg)] border border-[var(--border)] backdrop-filter backdrop-blur-lg rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-warm)]/10 via-transparent to-[var(--accent-cool)]/10 animate-pulse" />
          <div className="relative px-4">
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
            onFilterChange={handleFilterChange}
            availableGenres={availableGenres}
            totalMovies={movies.length}
            filteredCount={filteredMovies.length}
          />

          {filteredMovies.length === 0 ? (
            <div className="text-center py-12 sm:py-16 bg-[var(--card-bg)] border border-[var(--border)] backdrop-filter backdrop-blur-lg rounded-xl px-4">
              <p className="text-[var(--foreground)]/70 text-base sm:text-lg">
                Ingen filmer matcher dine filtre
              </p>
            </div>
          ) : (
            <div className="movie-grid">
              {filteredMovies.map((movie) => (
                <MovieCard 
                  key={movie._id} 
                  movie={movie} 
                  stats={statsMap.get(movie._id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
