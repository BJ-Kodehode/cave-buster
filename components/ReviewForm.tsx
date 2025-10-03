"use client";

import { useState } from "react";
import { Star, Send, MessageSquare } from "lucide-react";

interface ReviewFormProps {
  movieId: string;
  onReviewSubmitted?: () => void;
}

export default function ReviewForm({ movieId, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating || !reviewText.trim()) {
      alert("Vennligst fyll ut både rating og anmeldelse");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/movies/${movieId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          reviewText: reviewText.trim(),
        }),
      });

      if (response.ok) {
        setRating(0);
        setReviewText("");
        onReviewSubmitted?.();
      } else {
        const error = await response.json();
        alert(error.message || "Kunne ikke lagre anmeldelsen");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Noe gikk galt. Prøv igjen senere.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starNumber = i + 1;
      const isActive = starNumber <= (hoveredRating || rating);

      return (
        <button
          key={i}
          type="button"
          onClick={() => setRating(starNumber)}
          onMouseEnter={() => setHoveredRating(starNumber)}
          onMouseLeave={() => setHoveredRating(0)}
          className={`p-1 transition-all duration-200 ${
            isActive 
              ? "text-yellow-400 scale-110" 
              : "text-gray-600 hover:text-yellow-300"
          }`}
        >
          <Star
            className={`w-8 h-8 ${isActive ? "fill-current" : ""}`}
          />
        </button>
      );
    });
  };

  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-blue-400" />
        Skriv en anmeldelse
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Section */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Din vurdering
          </label>
          <div className="flex items-center gap-1">
            {renderStars()}
            {rating > 0 && (
              <span className="ml-3 text-yellow-400 font-medium">
                {rating} av 5 stjerner
              </span>
            )}
          </div>
        </div>

        {/* Review Text Section */}
        <div>
          <label htmlFor="reviewText" className="block text-sm font-medium text-gray-300 mb-3">
            Din anmeldelse
          </label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Hva syntes du om filmen? Del dine tanker..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            maxLength={1000}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              {reviewText.length}/1000 tegn
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !rating || !reviewText.trim()}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sender...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Publiser anmeldelse
            </>
          )}
        </button>
      </form>
    </div>
  );
}
