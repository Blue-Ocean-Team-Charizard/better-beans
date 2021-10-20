import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../firebase/auth_context';
import ReviewList from '../../components/ReviewList';

export default function Profile() {
  const { authUser, loading, logOff } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/login');
    }
  }, [authUser, loading, router]);

  return (
    <div className="profile">
      <div id="account">
        <div className="photo">
          {(authUser) ? <img className="profile-photo" src={authUser.photo} alt="avatar" /> : null}
        </div>
        <h3 className="info name">{(authUser) ? ` ${authUser.name}` : ''}</h3>
        <div className="btnDelete">Delete account</div>
      </div>
      <h1 className="title">Review
        <button type="button" className="btn btn-review"> Write a Review</button>
      </h1>

      <Meta />
      <h1>Profile Page</h1>
      {(authUser) ? <img className="profile-photo" src={authUser.photo} alt="avatar" /> : null}
      <span>
        {(authUser) ? ` ${authUser.name}` : ''}
      </span>
      <button
        type="button"
        onClick={logOff}
      >
        Log Off!
      </button>
      <br />
      <ReviewList />
    </div>
  );
}
