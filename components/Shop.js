/* eslint-disable react/prop-types */
import { useState } from 'react';
import Link from 'next/link';
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
      <div className="btnBack"><Link href="/search"><a>Back to list</a></Link></div>
      <div className="card shop">
        <h3 className="name">{name || 'SHOP NAME'}</h3>
        <BeanRating rating={shopRating} />
        <div className="opening_hours">Closed</div>
        {/* {shop.opening_hours ?
          shop.opening_hours.open_now ? <div className="opening_hours">Open</div> :
            <div className="opening_hours">Closed</div> :
          null} */}
        <div className="location">shop.vicinity</div>
        <div id="check-bean">
          <select className="visited" onChange={(e) => handleVisited(e)}>
            <option value="no" selected={visited === 'no' ? 'selected' : null}>Haven't Bean</option>
            <option value="want" selected={visited === 'want' ? 'selected' : null}>Want to Bean</option>
            <option value="yes" selected={visited === 'yes' ? 'selected' : null}>Already Bean</option>
          </select>
        </div>
      </div>

      <h1 className="title">Review
        <button type="button" className="btn btn-review" onClick={user ? () => setShowCreateReview(true) : () => {
          setShowLoginMsg(true);
          // console.log('redirect to login page');
        }}
        > Write a Review
        </button>
      </h1>


      {/* <h2 className="shop-name">{name || 'SHOP NAME'}</h2>
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
      </span> */}


      {/* <span>
        <select className="visited" onChange={(e) => handleVisited(e)}>
          <option value="no" selected={visited === 'no' ? 'selected' : null}>Haven't Bean</option>
          <option value="want" selected={visited === 'want' ? 'selected' : null}>Want to Bean</option>
          <option value="yes" selected={visited === 'yes' ? 'selected' : null}>Already Bean</option>
        </select>
      </span> */}
      {/* <br /> */}

      <span className="login-msg">
        {showLoginMsg ? 'Please login first here' : null}
        {' '}
      </span>
      {showCreateReview ? <CreateReview /> : null}
      <ReviewList />
    </div>
  );
}
