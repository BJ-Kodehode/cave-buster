import Link from "next/link";
import { Calendar, User, Star } from "lucide-react";
import type { Movie } from "@/types";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  // Funksjon for å få farge basert på sjanger
  const getGenreColor = (genre: string) => {
    const colors: Record<string, string> = {
      "Action": "bg-red-500/20 text-red-200 border-red-500/30",
      "Adventure": "bg-orange-500/20 text-orange-200 border-orange-500/30", 
      "Animation": "bg-pink-500/20 text-pink-200 border-pink-500/30",
      "Comedy": "bg-yellow-500/20 text-yellow-200 border-yellow-500/30",
      "Crime": "bg-gray-500/20 text-gray-200 border-gray-500/30",
      "Documentary": "bg-blue-500/20 text-blue-200 border-blue-500/30",
      "Drama": "bg-purple-500/20 text-purple-200 border-purple-500/30",
      "Family": "bg-green-500/20 text-green-200 border-green-500/30",
      "Fantasy": "bg-violet-500/20 text-violet-200 border-violet-500/30",
      "History": "bg-amber-500/20 text-amber-200 border-amber-500/30",
      "Horror": "bg-red-800/20 text-red-300 border-red-800/30",
      "Music": "bg-indigo-500/20 text-indigo-200 border-indigo-500/30",
      "Mystery": "bg-slate-500/20 text-slate-200 border-slate-500/30",
      "Romance": "bg-rose-500/20 text-rose-200 border-rose-500/30",
      "Science Fiction": "bg-cyan-500/20 text-cyan-200 border-cyan-500/30",
      "Sci-Fi": "bg-cyan-500/20 text-cyan-200 border-cyan-500/30",
      "TV Movie": "bg-teal-500/20 text-teal-200 border-teal-500/30",
      "Thriller": "bg-red-600/20 text-red-300 border-red-600/30",
      "War": "bg-stone-500/20 text-stone-200 border-stone-500/30",
      "Western": "bg-yellow-600/20 text-yellow-300 border-yellow-600/30"
    };
    
    return colors[genre] || "bg-[var(--accent-warm)]/20 text-[var(--accent-warm)] border-[var(--accent-warm)]/30"; // fallback
  };
  return (
    <Link
      href={`/movies/${movie._id}`}
      className="group block card rounded-xl p-4 sm:p-6 hover:border-[var(--accent-warm)] hover:shadow-xl hover:shadow-[var(--accent-warm)]/20 transition-all duration-300 hover:-translate-y-1 adventure-glow"
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
          
          <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getGenreColor(movie.genre)} flex-shrink-0`}>
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
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFD700] fill-current rating-star flex-shrink-0" />
            <span className="text-xs sm:text-sm text-[var(--foreground)]/60 truncate">Ingen anmeldelser ennå</span>
          </div>
          
          {movie.runtime && (
            <span className="text-xs text-[var(--accent-cool)]/80 flex-shrink-0">
              {movie.runtime} min
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
