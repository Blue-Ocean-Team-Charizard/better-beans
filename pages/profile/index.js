import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../firebase/auth_context';
import Meta from '../../components/Meta';
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
      <Meta />
      <h1>Profile Page</h1>
      <span>
        Logged in as
        {(authUser) ? ` ${authUser.name}` : ''}
      </span>
      {(authUser) ? <img className="profile-photo" src={authUser.photo} alt="avatar" /> : null}
      <br />
      <ReviewList />
    </div>
  );
}
