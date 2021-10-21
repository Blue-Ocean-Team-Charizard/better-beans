import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../firebase/auth_context';
import Meta from '../../components/Meta';
import ReviewList from '../../components/ReviewList';

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
      <h1 className="title">
        Reviews
      </h1>

      <br />
      <ReviewList />
      <button type="button" className="btn" onClick={logOff}>Sign Out</button>
      <button type="button" className="btn" onClick={deleteAccount}>Delete Account</button>
    </div>
  );
}
