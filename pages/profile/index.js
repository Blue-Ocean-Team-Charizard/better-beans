import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../firebase/auth_context';

export default function Profile() {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/login');
    }
  }, [authUser, loading]);

  return (
    <div className="container">
      <Header />
      <div className="main">
        Profiile page
      </div>
      <Footer />
    </div>
  );
}
