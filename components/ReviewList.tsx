"use client";

import { useState } from "react";
import { Star, User, Calendar, Edit, Trash2 } from "lucide-react";
import type { Review } from "@/types";

interface ReviewListProps {
  reviews: Review[];
  currentUserId?: string;
  movieId: string;
  onReviewUpdate?: () => void;
}

export default function ReviewList({ reviews, currentUserId, movieId, onReviewUpdate }: ReviewListProps) {
  const [deletingReviews, setDeletingReviews] = useState<Set<string>>(new Set());

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Er du sikker på at du vil slette denne anmeldelsen?")) {
      return;
    }

    setDeletingReviews(prev => new Set(prev).add(reviewId));

    try {
      const response = await fetch(`/api/movies/${movieId}/reviews/${reviewId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onReviewUpdate?.();
      } else {
        let errorMessage = "Kunne ikke slette anmeldelsen";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = `Feil ${response.status}: ${response.statusText}`;
        }
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Noe gikk galt. Prøv igjen senere.");
    } finally {
      setDeletingReviews(prev => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });
    }
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 border border-gray-700 rounded-xl bg-gray-900/50">
        <Star className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400 text-lg">Ingen anmeldelser ennå</p>
        <p className="text-gray-500 text-sm">Bli den første til å dele din mening!</p>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-600"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-400" />
        Anmeldelser ({reviews.length})
      </h3>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{review.reviewAuthor}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(review.createdAt).toLocaleDateString('no-NO')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(review.rating)}</div>
                {currentUserId === review.userId && (
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => {
                        // Edit functionality can be implemented later
                        alert("Edit-funksjonalitet kommer snart!");
                      }}
                      className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                      title="Rediger anmeldelse"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      disabled={deletingReviews.has(review._id)}
                      className="p-1 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Slett anmeldelse"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">{review.reviewText}</p>

            {review.updatedAt !== review.createdAt && (
              <p className="text-xs text-gray-500 mt-3">
                Redigert {new Date(review.updatedAt).toLocaleDateString('no-NO')}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
