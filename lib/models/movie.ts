import mongoose, { Schema, Document } from "mongoose";

export interface IMovie extends Document {
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
  description?: string;
  runtime?: number;
  cast: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const MovieSchema = new Schema<IMovie>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    director: {
      type: String,
      required: [true, "Director is required"],
      trim: true,
      maxlength: [50, "Director name cannot exceed 50 characters"],
    },
    releaseYear: {
      type: Number,
      required: [true, "Release year is required"],
      min: [1888, "Release year must be 1888 or later"],
      max: [new Date().getFullYear() + 5, "Release year cannot be more than 5 years in the future"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
      maxlength: [30, "Genre cannot exceed 30 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    runtime: {
      type: Number,
      min: [1, "Runtime must be at least 1 minute"],
      max: [600, "Runtime cannot exceed 600 minutes"],
    },
    cast: {
      type: [String],
      default: [],
      validate: {
        validator: function(v: string[]) {
          return v.every(actor => actor.trim().length > 0);
        },
        message: "All cast members must have valid names"
      }
    },
    createdBy: {
      type: String,
      required: [true, "Creator ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better performance
MovieSchema.index({ title: 1 });
MovieSchema.index({ genre: 1 });
MovieSchema.index({ releaseYear: 1 });
MovieSchema.index({ createdBy: 1 });

const Movie = mongoose.models.Movie || mongoose.model<IMovie>("Movie", MovieSchema);

export default Movie;
