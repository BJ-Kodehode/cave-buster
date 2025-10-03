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
      className="group block bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
            <User className="w-4 h-4" />
            <span>{movie.director}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{movie.releaseYear}</span>
          </div>
          
          <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
            {movie.genre}
          </div>
        </div>

        {movie.description && (
          <p className="text-gray-400 text-sm line-clamp-3">
            {movie.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-400">Ingen anmeldelser ennå</span>
          </div>
          
          {movie.runtime && (
            <span className="text-xs text-gray-500">
              {movie.runtime} min
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
