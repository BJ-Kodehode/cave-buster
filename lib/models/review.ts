import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  movieId: mongoose.Types.ObjectId;
  userId: string;
  reviewAuthor: string;
  reviewText: string;
  rating: number;
  helpfulBy: string[];
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    movieId: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: [true, "Movie ID is required"],
    },
    userId: {
      type: String,
      required: [true, "User ID is required"],
    },
    reviewAuthor: {
      type: String,
      required: [true, "Review author is required"],
      trim: true,
    },
    reviewText: {
      type: String,
      required: [true, "Review text is required"],
      trim: true,
      minlength: [10, "Review must be at least 10 characters long"],
      maxlength: [1000, "Review cannot exceed 1000 characters"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1 star"],
      max: [5, "Rating cannot exceed 5 stars"],
    },
    helpfulBy: {
      type: [String],
      default: [],
      index: true,
    },
    helpfulCount: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better performance
ReviewSchema.index({ movieId: 1 });
ReviewSchema.index({ userId: 1 });
ReviewSchema.index({ rating: -1 });
ReviewSchema.index({ helpfulCount: -1 });
ReviewSchema.index({ movieId: 1, userId: 1 }, { unique: true });
ReviewSchema.index({ rating: 1 });
ReviewSchema.index({ createdAt: -1 });

// Compound index to prevent duplicate reviews from the same user for the same movie
ReviewSchema.index({ movieId: 1, userId: 1 }, { unique: true });

const Review = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
