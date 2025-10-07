// types/index.ts

// Client-side types (with string IDs and dates)
export type Movie = {
  _id: string;
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
  description?: string;
  runtime?: number;
  cast: string[];
  createdBy: string;
  createdAt: string; // ISO string for client-side
  updatedAt: string; // ISO string for client-side
};

export type Review = {
  _id: string;
  movieId: string; // String ID for client-side
  userId: string;
  reviewAuthor: string;
  reviewText: string;
  rating: number;
  createdAt: string; // ISO string for client-side
  updatedAt: string; // ISO string for client-side
  helpfulCount?: number;
  helpfulBy?: string[];
};

export type ReviewStats = {
  movieId: string;
  reviewCount: number;
  avgRating: number | null;
};

export type OverallStats = {
  totalMovies: number;
  totalReviews: number;
  avgRating: number | null;
};

// API response wrapper
export type ApiResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

// Form data types (re-export from validation schemas)
export type { MovieFormData, UpdateMovieData } from "@/lib/validations/movieSchema";
export type { ReviewFormData, UpdateReviewData } from "@/lib/validations/reviewSchema";
