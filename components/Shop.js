/* eslint-disable react/prop-types */
import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import ReviewList from './ReviewList';
import CreateReview from './CreateReview';
import BeanRating from './BeanRating';
import { useAuth } from '../firebase/auth_context';

const dummyReviews = [
  { rating: 5 }, { rating: 4 },
];

export default function Shop({ googleData, id, shopData }) {
  const { authUser } = useAuth();
  const shopId = id;
  const [showCreateReview, setShowCreateReview] = useState(false);
  const [showLoginMsg, setShowLoginMsg] = useState(false);
  const [visited, setVisited] = useState('no');
  const shopInfo = Object.keys(googleData).length === 0 ? shopData : googleData;
  const GET_REVIEWS = gql`
    query ReviewsByShop($shop_id: String!) {
      reviewsByShop(shop_id: $shop_id) {
        id
        name
        body
        rating
        date
        helpful
        reported
        shop_id
        user_id
      }
    }
  `;

  const { data, loading, err } = useQuery(GET_REVIEWS, {
    variables: { shop_id: shopId },
  });

  if (loading) return 'Loading...';
  if (err) return `Error! ${err.message}!`;

  const user = authUser;

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

  return (
    <div>
      <div className="card">
        <h3 className="name">{shopInfo.name || 'SHOP NAME'}</h3>
        <BeanRating reviews={data ? data.reviewsByShop : null} />
        <div className="opening_hours">{shopInfo.opening_hours ? shopInfo.opening_hours.open_now ? 'Open Now' : 'Closed' : null}</div>
        <div className="location">
          {' '}
          Located at:
          {' '}
          {shopInfo.vicinity}
          {' '}
        </div>
        <span>
          <select value={visited} className="visited" onChange={(e) => handleVisited(e)}>
            <option value="no">Haven't Bean</option>
            <option value="want">Want to Bean</option>
            <option value="yes">Already Bean</option>
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
