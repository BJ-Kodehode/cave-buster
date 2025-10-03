import Link from "next/link";
import { Calendar, User, Star } from "lucide-react";
import type { Movie } from "@/types";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      href={`/movies/${movie._id}`}
      className="group block card rounded-xl p-6 hover:border-[var(--accent-warm)] hover:shadow-xl hover:shadow-[var(--accent-warm)]/20 transition-all duration-300 hover:-translate-y-1 adventure-glow"
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent-cool)] transition-colors line-clamp-2">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-[var(--foreground)]/70 text-sm mt-2">
            <User className="w-4 h-4" />
            <span>{movie.director}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[var(--foreground)]/70 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{movie.releaseYear}</span>
          </div>
          
          <div className="px-3 py-1 bg-[var(--accent-warm)]/20 text-[var(--accent-warm)] rounded-full text-sm font-medium border border-[var(--accent-warm)]/30">
            {movie.genre}
          </div>
        </div>

        {movie.description && (
          <p className="text-[var(--foreground)]/70 text-sm line-clamp-3">
            {movie.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-[#FFD700] fill-current rating-star" />
            <span className="text-sm text-[var(--foreground)]/60">Ingen anmeldelser ennå</span>
          </div>
          
          {movie.runtime && (
            <span className="text-xs text-[var(--accent-cool)]/80">
              {movie.runtime} min
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
