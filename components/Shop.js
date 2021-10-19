/* eslint-disable react/prop-types */
import { useState } from 'react';
import ReviewList from './ReviewList';
import CreateReview from './CreateReview';
import BeanRating from './BeanRating';

const dummyReviews = [
  { rating: 5 }, { rating: 4 }
];

export default function Shop({ name, location, operational, reviews = dummyReviews }) {
  const open = operational || true;
  const user = true;
  const [showCreateReview, setShowCreateReview] = useState(false);
  const [showLoginMsg, setShowLoginMsg] = useState(false);
  const [visited, setVisited] = useState('maybe');
  const avgRating = () => {
    let ratings = 0;
    reviews.map(review => ratings += review.rating);
    return ratings / reviews.length;
  };

  const handleVisited = (e) => {
    e.preventDefault();
    setVisited(e.target.value);
  };

  const shopRating = avgRating();

  return (
    <div>
      <h2>{name}</h2>
      <BeanRating rating={shopRating} />
      <br />
      <span>{open ? 'Open Now' : 'Closed'}</span>
      <br />
      <span> Located at: {location} </span>
      <br />
      <span>
        <select className="visited" onChange={(e) => handleVisited(e)}>
          <option value="no">Haven't Bean</option>
          <option value="want">Want to Bean</option>
          <option value="yes">Already Bean</option>
        </select>
      </span>
      <br />

      <button
        type="button"
        onClick={
          user
            ? () => setShowCreateReview(true)
            : () => {
              setShowLoginMsg(true);
              console.log('redirect to login page');
            }
        }
      >
        Write a Review
      </button>
      <span>{showLoginMsg ? 'Please Login first here' : null} </span>
      {showCreateReview ? <CreateReview /> : null}
      <ReviewList />
    </div>
  );
}