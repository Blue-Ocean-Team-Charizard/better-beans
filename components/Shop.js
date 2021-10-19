/* eslint-disable react/prop-types */
import { useState } from 'react';
import ReviewList from './ReviewList';
import CreateReview from './CreateReview';
import BeanRating from './BeanRating';
import { useAuth } from '../firebase/auth_context';

const dummyReviews = [
  { rating: 5 }, { rating: 4 },
];

export default function Shop({
  name, location, operational, reviews = dummyReviews,
}) {
  const { authUser, loading } = useAuth();
  const [showCreateReview, setShowCreateReview] = useState(false);
  const [showLoginMsg, setShowLoginMsg] = useState(false);
  const [visited, setVisited] = useState('no');

  const open = operational || true;
  const user = authUser;
  const avgRating = () => {
    let ratings = 0;
    reviews.map((review) => {
      ratings += review.rating;
      return null;
    });
    return ratings / reviews.length;
  };
  console.log(authUser);

  const handleVisited = (e) => {
    e.preventDefault();
    console.log('set visited to:', e.target.value);
    if (user) {
      setVisited(e.target.value);
      // API CALL TO THE VISITED OF USER
    } else {
      // redirect to login
    }
  };

  const shopRating = avgRating();

  return (
    <div>
      <h2 className="shop-name">{name || 'SHOP NAME'}</h2>
      <BeanRating rating={shopRating} />
      <br />
      <span className="open-now">{open ? 'Open Now' : 'Closed'}</span>
      <br />
      <span className="shop-location">
        {' '}
        Located at:
        {' '}
        {location}
        {' '}
      </span>
      <br />
      <span>
        <select className="visited" onChange={(e) => handleVisited(e)}>
          <option value="no" selected={visited === 'no' ? 'selected' : null}>Haven't Bean</option>
          <option value="want" selected={visited === 'want' ? 'selected' : null}>Want to Bean</option>
          <option value="yes" selected={visited === 'yes' ? 'selected' : null}>Already Bean</option>
        </select>
      </span>
      <br />
      <span>
        <button
          className="write-review-btn"
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
        <br />
        <span className="login-msg">
          {showLoginMsg ? 'Please login first here' : null}
          {' '}
        </span>
      </span>
      {showCreateReview ? <CreateReview /> : null}
      <ReviewList />
    </div>
  );
}
