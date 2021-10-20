// import Head from 'next/head';
import { AuthUserProvider } from '../firebase/auth_context';
import SearchContextProvider from '../components/SearchContext';
import Layout from '../components/Layout';
import '../styles/globals.css';
import '../styles/review.css';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../graphql/apollo.js';

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
<<<<<<< HEAD
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
=======
      <SearchContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SearchContextProvider>
>>>>>>> e04aa53ba834d02f94e7ce67bff2562e23cae19a
    </AuthUserProvider>
  );
}

export default MyApp;
