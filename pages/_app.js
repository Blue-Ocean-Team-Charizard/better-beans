// import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { AuthUserProvider } from '../firebase/auth_context';
import SearchContextProvider from '../components/SearchContext';
import Layout from '../components/Layout';
import '../styles/globals.css';
import '../styles/light-mode.css';
import '../styles/review.css';
import '../styles/createReview.css';
import '../styles/map.css';
import apolloClient from '../graphql/apollo';

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
