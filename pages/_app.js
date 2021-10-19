// import Head from 'next/head';
import { AuthUserProvider } from '../firebase/auth_context'
import Layout from '../components/Layout';
import '../styles/globals.css';
import '../styles/review.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthUserProvider>
  );
}

export default MyApp;
