/* eslint-disable react/prop-types */
import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import ReviewList from './ReviewList';
import CreateReview from './CreateReview';
import BeanRating from './BeanRating';
import { useAuth } from '../firebase/auth_context';
import SocialMediaButtons from './SocialMediaButtons';

const dummyReviews = [
  { rating: 5 }, { rating: 4 },
];

export default function Shop({ id, shopData }) {
  const { authUser } = useAuth();
  const shopId = id;
  const [showCreateReview, setShowCreateReview] = useState(false);
  const [showLoginMsg, setShowLoginMsg] = useState(false);
  const [visited, setVisited] = useState('no');
  const shopInfo = shopData;
  const user = authUser;

  const GET_REVIEWS = gql`
    query ShopQuery($shop_id: String!) {
      reviewsByShop(shop_id: $shop_id) {
        id
        name
        avatar
        body
        rating
        date
        helpful
        reported
        shop_id
        shop_name
        user_id
      }
    }
  `;

  const { data: reviews, loading: reviewLoading, error: reivewError } = useQuery(GET_REVIEWS, {
    variables: { shop_id: shopId },
  });
  // if (reviewloading) return 'Loading...';
  // if (reviewError) return `Error! ${err.message}!`;

  const GET_VISIT = gql`
  query BeansByUserAndShop(
    $user_id: String!
    $shop_id: String!
    ) {
      beansByUserAndShop(
      user_id: $user_id
      shop_id: $shop_id
      ) {
      id
      visited
    }
  }
`;

  const { data: visits, loading: visitLoading, error: visitError } = useQuery(GET_VISIT, {
    variables: {
      user_id: user ? user.uid : "",
      shop_id: shopId
    },
  });

  // if (loading) return 'Loading...';
  // if (visitError) return `Error! ${visitError.message}!`;



  console.log("REVIEWS", reviews, "VISITS", visits);

  const CREATE_VISIT = gql`
  mutation CreateVisit(
    $visited: Boolean!
    $user_id: String!
    $shop_id: String!
    $shop_name: String!
  ) {
    createVisited(
      visited: $visited
      user_id: $user_id
      shop_id: $shop_id
      shop_name: $shop_name
    ) {
      visited
    }
  }
`;

  const [createVisited, { data, loading, err }] = useMutation(CREATE_VISIT);

  const handleVisited = (e) => {
    e.preventDefault();
    // console.log('set visited to:', e.target.value);
    // DB CALL TO THE VISITED OF USER
    if (user) {
      setVisited(e.target.value);
      if (visits) {
        //toggleVisited
      } else {
        // create the visit
        if (e.target.value === "true") {
          createVisited({
            variables: {
              visited: true,
              user_id: user.uid,
              shop_id: shopId,
              shop_name: shopInfo.name,
            },
          });
          console.log("WENT INTO TRUE")
        } else if (e.target.value === "false") {
          createVisited({
            variables: {
              visited: false,
              user_id: user.uid,
              shop_id: shopId,
              shop_name: shopInfo.name,
            },
          });
          console.log("WENT INTO FALSE")
        }
        console.log(e.target.value);
        console.log(user.uid, shopId, shopInfo.name);


        if (err) return `Error! ${error.message}!`
      }
    } else {
      setShowLoginMsg(true);
    }
  };
  user ? console.log("USER", user.uid) : null;
  // if (visitError) return `Error! ${visitError.message}!`;

  return (
    <div>
      <div className="card">
        <h3 className="name">{shopInfo.name || 'SHOP NAME'}</h3>
        <BeanRating reviews={reviews ? reviews.reviewsByShop : null} />
        <div className="opening_hours">{shopInfo.opening_hours ? shopInfo.opening_hours.open_now ? 'Open Now' : 'Closed' : null}</div>
        <div className="location">
          {' '}
          Located at:
          {' '}
          {shopInfo.vicinity}
          {' '}
        </div>
        <div className="social-btns">
          Share and save on: <SocialMediaButtons />
          <span>
            <select value={visited} className="visited" onChange={(e) => handleVisited(e)}>
              <option value="no">Haven't Bean</option>
              <option value={`${false}`}>Want to Bean</option>
              <option value={`${true}`}>Already Bean</option>
            </select>
          </span>
        </div>
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
      {showCreateReview ? <CreateReview shopId={shopId} shopName={shopInfo.name} /> : null}
      <ReviewList reviews={reviews ? reviews.reviewsByShop : []} notUser={true} />
    </div>
  );
}
