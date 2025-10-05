"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import type { Movie } from "@/types";

interface EditMovieFormProps {
  movieId: string;
  initialData: Movie;
}

export default function EditMovieForm({ movieId, initialData }: EditMovieFormProps) {
  const [formData, setFormData] = useState({
    title: initialData.title,
    description: initialData.description || "",
    year: initialData.releaseYear,
    genre: initialData.genre,
    director: initialData.director,
    cast: initialData.cast.join(", "),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const movieData = {
        title: formData.title,
        description: formData.description,
        releaseYear: parseInt(formData.year.toString()),
        genre: formData.genre,
        director: formData.director,
        cast: formData.cast ? formData.cast.split(",").map((actor: string) => actor.trim()).filter(Boolean) : [],
      };

      const response = await fetch(`/api/movies/${movieId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        router.push(`/movies/${movieId}`);
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.message || "Kunne ikke oppdatere filmen");
      }
    } catch (error) {
      console.error("Error updating movie:", error);
      alert("Noe gikk galt. Prøv igjen senere.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const genres = [
    "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary",
    "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery",
    "Romance", "Science Fiction", "TV Movie", "Thriller", "War", "Western"
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Tilbake
        </button>
        <h1 className="text-3xl font-bold text-white">Rediger film</h1>
        <p className="text-gray-400 mt-2">Oppdater informasjon om &quot;{initialData.title}&quot;</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Tittel *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Beskrivelse *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Year and Genre */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-2">
                År *
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                min="1800"
                max={new Date().getFullYear() + 10}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-2">
                Sjanger *
              </label>
              <select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Velg sjanger</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Director */}
          <div className="mb-6">
            <label htmlFor="director" className="block text-sm font-medium text-gray-300 mb-2">
              Regissør *
            </label>
            <input
              type="text"
              id="director"
              name="director"
              value={formData.director}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Cast */}
          <div className="mb-6">
            <label htmlFor="cast" className="block text-sm font-medium text-gray-300 mb-2">
              Skuespillere (valgfritt)
            </label>
            <input
              type="text"
              id="cast"
              name="cast"
              value={formData.cast}
              onChange={handleInputChange}
              placeholder="Skill med komma: Actor 1, Actor 2, Actor 3"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Skill skuespillerne med komma</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Oppdaterer...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Lagre endringer
            </>
          )}
        </button>
      </form>
    </div>
  );
}
