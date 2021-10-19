// import Head from 'next/head';
import { AuthUserProvider } from '../firebase/auth_context';
import SearchContextProvider from '../components/SearchContext';
import Layout from '../components/Layout';
import '../styles/globals.css';
import '../styles/review.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <SearchContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SearchContextProvider>
    </AuthUserProvider>
  );
}

export default MyApp;
