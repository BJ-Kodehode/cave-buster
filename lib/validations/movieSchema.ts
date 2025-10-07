import { z } from "zod";

// Movie creation/update validation schema
export const movieSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  director: z
    .string()
    .trim()
    .min(1, "Director is required")
    .max(50, "Director name cannot exceed 50 characters"),
  releaseYear: z
    .number()
    .int()
    .min(1888, "Release year must be 1888 or later")
    .max(new Date().getFullYear() + 5, "Release year cannot be more than 5 years in the future"),
  genre: z
    .string()
    .trim()
    .min(1, "Genre is required")
    .max(30, "Genre cannot exceed 30 characters"),
  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),
  runtime: z
    .number()
    .int()
    .min(1, "Runtime must be at least 1 minute")
    .max(600, "Runtime cannot exceed 600 minutes")
    .optional(),
  cast: z
    .array(
      z.string()
        .trim()
        .min(1, "Cast member name cannot be empty")
    )
    .default([])
    .refine(
      (cast) => cast.every(member => member.length > 0),
      "All cast members must have valid names"
    ),
});

// Schema for partial updates
export const updateMovieSchema = movieSchema.partial();

// Inferred types
export type MovieFormData = z.infer<typeof movieSchema>;
export type UpdateMovieData = z.infer<typeof updateMovieSchema>;
