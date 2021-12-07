/* eslint-disable react/prop-types */
import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import ReviewList from './ReviewList';
import CreateReview from './CreateReview';
import BeanRating from './BeanRating';
import { useAuth } from '../firebase/auth_context';
import SocialMediaButtons from './SocialMediaButtons';
import Link from 'next/link';

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
      user_id: user ? user.uid : '',
      shop_id: shopId,
    },
  });

  // if (loading) return 'Loading...';
  // if (visitError) return `Error! ${visitError.message}!`;

  // console.log("REVIEWS", reviews, "VISITS", visits);

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

  const [createVisited, { data: createVisitData, loading: createVisitLoading, err: createVisitErr }] = useMutation(CREATE_VISIT);

  const TOGGLE_VISIT = gql`
  mutation ToggleVisitedMutation(
    $toggleVisitedId: Int!
    $visited: Boolean!
    ) {
    toggleVisited(
      id: $toggleVisitedId
      visited: $visited) {
      id
      visited
    }
  }
`;

  const [toggleVisited, { data: toggleData, loading: toggleLoading, err }] = useMutation(TOGGLE_VISIT);

  const handleVisited = (e) => {
    e.preventDefault();
    // console.log('set visited to:', e.target.value);
    // DB CALL TO THE VISITED OF USER
    const flag = e.target.value;
    if (user) {
      setVisited(flag);
      if (visits && visits.beansByUserAndShop.length > 0) {
        //toggleVisited
        if (flag === 'true') {
          toggleVisited({
            variables: {
              toggleVisitedId: visits.beansByUserAndShop[0].id,
              visited: true,
            },
          });
        } else if (flag === 'false') {
          toggleVisited({
            variables: {
              toggleVisitedId: visits.beansByUserAndShop[0].id,
              visited: false,
            },
          });
        }
      } else {
        // create the visit
        if (flag === 'true') {
          createVisited({
            variables: {
              visited: true,
              user_id: user.uid,
              shop_id: shopId,
              shop_name: shopInfo.name,
            },
          });
          // console.log("WENT INTO TRUE")
        } else if (flag === 'false') {
          createVisited({
            variables: {
              visited: false,
              user_id: user.uid,
              shop_id: shopId,
              shop_name: shopInfo.name,
            },
          });
          // console.log("WENT INTO FALSE")
        }
        // console.log(flag);
        // console.log(user.uid, shopId, shopInfo.name);

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
          Share and save on: <SocialMediaButtons name={shopInfo.name} shopId={shopId} />
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
      <div className="login-msg">
        {showLoginMsg ? (<span>Please login first <Link href={"/login"}>
          <a style={{ textDecoration: "underline" }} href={"/login"}>here</a>
        </Link></span>) : null}
        {' '}
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
      {showCreateReview ? <CreateReview shopId={shopId} shopName={shopInfo.name} reviews={reviews ? reviews.reviewsByShop : []} /> : null}
      <ReviewList reviews={reviews ? reviews.reviewsByShop : []} notUser={true} />
    </div >
  );
}
