import ReviewList from "./ReviewList";
import CreateReview from "./CreateReview";
import { useState } from "react";

export default function Shop({ name, location, operational, reviews }) {
  const open = operational === "OPERATIONAL";
  const user = true;
  const [showCreateReview, setShowCreateReview] = useState(false);
  const avgRating = (reviews) => {
    let ratings = 0;
    reviews.forEach((review) => (ratings += review.rating));
    return ratings / reviews.length;
  };

  return (
    <div>
      <h2>{name}</h2>
      <span>Stars Rating Stand In ⭐️⭐️⭐️⭐️⭐️</span>
      <span>{open ? "Open Now" : "Closed"}</span>
      <button
        onClick={
          user
            ? () => setShowCreateReview(true)
            : () => console.log("redirect to login page")
        }
      >
        Write a Review
      </button>
      {showCreateReview ? <CreateReview /> : null}
      <ReviewList />
    </div>
  );
}
