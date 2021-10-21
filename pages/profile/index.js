import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useAuth } from '../../firebase/auth_context';
import Meta from '../../components/Meta';
import ReviewList from '../../components/ReviewList';
import VisitBeanList from '../../components/VisitBeanList';

export default function Profile() {
  const { authUser, loading, logOff, deleteAccount } = useAuth();
  const router = useRouter();

  const GET_REVIEWS = gql`
    query ReviewsByUser($user_id: String!) {
      reviewsByUser(user_id: $user_id) {
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

  console.log('user id ', authUser);

  const { data, reviewLoad, err } = useQuery(GET_REVIEWS, {
    variables: { user_id: authUser ? authUser.uid : '' },
  });

  if (reviewLoad) return 'Loading...';
  if (err) return `Error! ${err.message}!`;

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/login');
    }
  }, [authUser, loading, router]);

  return (
    <div className="profile">
      <Meta />
      <div id="account">
        <div className="photo">
          {(authUser) ? <img className="profile-photo" src={authUser.photo} alt="avatar" /> : null}
        </div>
        <h3 className="info name">{(authUser) ? ` ${authUser.name}` : ''}</h3>

      </div>
      <h1 className="title">
        My Better Beans
      </h1>
      <br />
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation" style={{ width: 'calc(100% / 3)' }}>
          <button className="nav-link active" id="map-tab" data-bs-toggle="tab" data-bs-target="#want-bean" type="button" role="tab" aria-controls="map" aria-selected="true">
            Want to Bean
          </button>
        </li>
        <li className="nav-item" role="presentation" style={{ width: 'calc(100% / 3)' }}>
          <button className="nav-link" id="shops-tab" data-bs-toggle="tab" data-bs-target="#already-bean" type="button" role="tab" aria-controls="shops" aria-selected="false">
            Already Bean
          </button>
        </li>
        <li className="nav-item" role="presentation" style={{ width: 'calc(100% / 3)' }}>
          <button className="nav-link" id="shops-tab" data-bs-toggle="tab" data-bs-target="#my-reviews" type="button" role="tab" aria-controls="shops" aria-selected="false">
            My Reviews
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="want-bean" role="tabpanel" aria-labelledby="home-tab">
          {/* <h1 className="title">
            Want to Bean
          </h1> */}
          <VisitBeanList
            userId={authUser ? "Jan" : ""}
            flag={false}
          />
        </div>
        <div className="tab-pane fade" id="already-bean" role="tabpanel" aria-labelledby="profile-tab">
          {/* <h1 className="title">
            Already Bean
          </h1> */}
          <VisitBeanList
            userId={authUser ? "Jan" : ""}
            flag={true}
          />
        </div>
        <div className="tab-pane fade" id="my-reviews" role="tabpanel" aria-labelledby="profile-tab">
          {/* <h1 className="title">
            Reviews
          </h1> */}
          <ReviewList reviews={data ? data.reviewsByUser : []} />
        </div>
      </div>

      <br />

      <button type="button" className="btn" onClick={logOff}>Sign Out</button>
      <button type="button" className="btn" onClick={deleteAccount}>Delete Account</button>
    </div>
  );
}
