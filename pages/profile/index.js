import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../firebase/auth_context';
import Meta from '../../components/Meta';
import ReviewList from '../../components/ReviewList';
import VisitBeanList from '../../components/VisitBeanList';

export default function Profile() {
  const { authUser, loading, logOff, deleteAccount } = useAuth();
  const router = useRouter();

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
          <VisitBeanList
            title="Want To Bean"
            shopList={[]}
          />
        </div>
        <div className="tab-pane fade" id="already-bean" role="tabpanel" aria-labelledby="profile-tab">
          <VisitBeanList
            title="Already Bean"
            shopList={[]}
          />
        </div>
        <div className="tab-pane fade" id="my-reviews" role="tabpanel" aria-labelledby="profile-tab">
          <h1 className="title">
            Reviews
          </h1>
          <ReviewList />
        </div>
      </div>

      <br />

      <button type="button" className="btn" onClick={logOff}>Sign Out</button>
      <button type="button" className="btn" onClick={deleteAccount}>Delete Account</button>
    </div>
  );
}
