import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../firebase/auth_context';
import ReviewList from '../../components/ReviewList';

export default function Profile() {
  const { authUser, loading } = useAuth();
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
        <div className="info">{(authUser) ? ` ${authUser.name}` : ''}</div>
      </div>
      <h1 className="title">Review
        <button type="button" className="btn btn-review"> Write a Review</button>
      </h1>

      <ReviewList />
    </div>
  );
}
