import { z } from "zod";

// Review creation/update validation schema
export const reviewSchema = z.object({
  reviewText: z
    .string()
    .trim()
    .min(10, "Review must be at least 10 characters long")
    .max(1000, "Review cannot exceed 1000 characters"),
  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1 star")
    .max(5, "Rating cannot exceed 5 stars"),
});

// Schema for partial updates
export const updateReviewSchema = reviewSchema.partial();

// Inferred types
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type UpdateReviewData = z.infer<typeof updateReviewSchema>;