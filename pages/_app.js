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
      <ApolloProvider client={apolloClient}>
        <SearchContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SearchContextProvider>
      </ApolloProvider>
    </AuthUserProvider>
  );
}

export default MyApp;
