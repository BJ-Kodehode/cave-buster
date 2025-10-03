import { z } from "zod";

export const reviewSchema = z.object({
  reviewText: z
    .string()
    .min(10, "Review must be at least 10 characters long")
    .max(1000, "Review must be less than 1000 characters"),
  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1 star")
    .max(5, "Rating cannot exceed 5 stars"),
});

export const updateReviewSchema = reviewSchema.partial();

export type ReviewFormData = z.infer<typeof reviewSchema>;
export type UpdateReviewData = z.infer<typeof updateReviewSchema>;