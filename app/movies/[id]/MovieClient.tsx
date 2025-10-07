"use client";

import { useRouter } from "next/navigation";
import ReviewList from "@/components/ReviewList";
import ReviewForm from "@/components/ReviewForm";
import type { Review as ReviewType } from "@/types";

interface MovieClientProps {
  movieId: string;
  reviews: ReviewType[];
  currentUserId?: string;
}

export default function MovieClient({ movieId, reviews, currentUserId }: MovieClientProps) {
  const router = useRouter();

  const handleReviewUpdate = () => {
    router.refresh();
  };

  return (
    <>
      {currentUserId && <ReviewForm movieId={movieId} />}
      
      <ReviewList
        reviews={reviews}
        currentUserId={currentUserId}
        movieId={movieId}
        onReviewUpdate={handleReviewUpdate}
      />
    </>
  );
}