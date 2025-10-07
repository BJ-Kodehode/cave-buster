import Link from "next/link";
import { Calendar, User, Star, MessageSquare, Clock } from "lucide-react";
import type { Movie, ReviewStats } from "@/types";
import { getGenreBadgeColor, getGenreCardColor } from "@/lib/genreColors";

interface MovieCardProps {
  movie: Movie;
  stats?: ReviewStats;
}

export default function MovieCard({ movie, stats }: MovieCardProps) {
  return (
    <Link
      href={`/movies/${movie._id}`}
      className={`group block rounded-xl p-4 sm:p-6 backdrop-filter backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 adventure-glow ${getGenreCardColor(movie.genre)}`}
    >
      <div className="space-y-3 sm:space-y-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent-cool)] transition-colors line-clamp-2">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-[var(--foreground)]/70 text-sm mt-1 sm:mt-2">
            <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{movie.director}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[var(--foreground)]/70 text-sm">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>{movie.releaseYear}</span>
          </div>
          
          <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getGenreBadgeColor(movie.genre)} flex-shrink-0`}>
            {movie.genre}
          </div>
        </div>

        {movie.description && (
          <p className="text-[var(--foreground)]/70 text-sm line-clamp-3">
            {movie.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-[var(--border)] gap-2">
          <div className="flex items-center gap-1 min-w-0">
            {stats && stats.avgRating ? (
              <>
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFD700] fill-current rating-star flex-shrink-0" />
                <span className="text-xs sm:text-sm text-[var(--foreground)]/80 font-medium">
                  {stats.avgRating.toFixed(1)}
                </span>
                <span className="text-xs text-[var(--foreground)]/60">
                  ({stats.reviewCount})
                </span>
              </>
            ) : (
              <>
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFD700] fill-current rating-star flex-shrink-0" />
                <span className="text-xs sm:text-sm text-[var(--foreground)]/60 truncate">Ingen anmeldelser ennå</span>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-xs text-[var(--accent-cool)]/80 flex-shrink-0">
            {stats && (
              <div className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                <span>{stats.reviewCount}</span>
              </div>
            )}
            {movie.runtime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{movie.runtime} min</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
