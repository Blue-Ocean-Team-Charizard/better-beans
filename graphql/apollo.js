import { ApolloClient, InMemoryCache } from '@apollo/client';

// https://better-beans.vercel.app
// http://localhost:3000

const apolloClient = new ApolloClient({
  uri: process.env.APOLLO_URI,
  cache: new InMemoryCache(),
});

export default apolloClient;
