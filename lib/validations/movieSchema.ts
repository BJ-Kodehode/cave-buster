import { z } from "zod";

export const movieSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  director: z
    .string()
    .min(1, "Director is required")
    .max(50, "Director name must be less than 50 characters"),
  releaseYear: z
    .number()
    .int()
    .min(1888, "Release year must be 1888 or later")
    .max(new Date().getFullYear() + 5, "Release year cannot be more than 5 years in the future"),
  genre: z
    .string()
    .min(1, "Genre is required")
    .max(30, "Genre must be less than 30 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  runtime: z
    .number()
    .int()
    .min(1, "Runtime must be at least 1 minute")
    .max(600, "Runtime cannot exceed 600 minutes")
    .optional(),
  cast: z
    .array(z.string().trim().min(1))
    .optional()
    .default([]),
});

export const updateMovieSchema = movieSchema.partial();

export type MovieFormData = z.infer<typeof movieSchema>;
export type UpdateMovieData = z.infer<typeof updateMovieSchema>;
