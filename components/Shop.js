/* eslint-disable react/prop-types */
import { gql, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import ReviewList from './ReviewList';
import CreateReview from './CreateReview';
import BeanRating from './BeanRating';
import { useAuth } from '../firebase/auth_context';

const dummyReviews = [
  { rating: 5 }, { rating: 4 },
];

export default function Shop({ googleData, id }) {
  const { authUser } = useAuth();
  const shopId = id;
  const [showCreateReview, setShowCreateReview] = useState(false);
  const [showLoginMsg, setShowLoginMsg] = useState(false);
  const [visited, setVisited] = useState('no');

  const GET_REVIEWS = gql`
  query ReviewsByShop($shop_id: String!) {
    reviewsByShop(shop_id: $shop_id) {
      name
      body
      rating
      helpful
      reported
      shop_id
      user_id
    }
  }
`;
  console.log('THE ID IS:', shopId);

  const { data, loading, err } = useQuery(GET_REVIEWS, {
    variables: {
      shop_id: shopId,
    },
  });

  if (loading) return 'Loading...';
  if (err) return `Error! ${err.message}!`;

  // const reviews = data.reviewsByShop;

  // useEffect(() => {
  //   getReviews({
  //     variables: {
  //       shop_id: shopId,
  //     },
  //   });
  // });

  // const open = operational || true;
  const user = authUser;

  // console.log(authUser);

  const handleVisited = (e) => {
    e.preventDefault();
    // console.log('set visited to:', e.target.value);
    if (user) {
      setVisited(e.target.value);
      // DB CALL TO THE VISITED OF USER
    } else {
      // redirect to login
    }
  };

  // const shopRating = (reviews.length > 0) ? avgRating() : 0;

  // console.log(data);

  return (
    <div>
      <div className="card">
        <h3 className="name">{googleData.name || 'SHOP NAME'}</h3>
        <BeanRating reviews={data ? data.reviewsByShop : null} />
        <div className="opening_hours">{googleData.opening_hours ? googleData.opening_hours.open_now ? 'Open Now' : 'Closed' : null}</div>
        <div className="location">
          {' '}
          Located at:
          {' '}
          {googleData.vicinity}
          {' '}
        </div>
        <span>
          <select className="visited" onChange={(e) => handleVisited(e)}>
            <option value="no" selected={visited === 'no' ? 'selected' : null}>Haven't Bean</option>
            <option value="want" selected={visited === 'want' ? 'selected' : null}>Want to Bean</option>
            <option value="yes" selected={visited === 'yes' ? 'selected' : null}>Already Bean</option>
          </select>
        </span>
        <br />
      </div>

      <h1 className="title">
        Reviews
        <button
          className="btn btn-review"
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
      </h1>
      <div className="login-msg">
        {showLoginMsg ? 'Please login first here' : null}
        {' '}
      </div>
      {showCreateReview ? <CreateReview shopId={shopId} /> : null}
      <ReviewList reviews={data ? data.reviewsByShop : []} />
    </div>
  );
}
