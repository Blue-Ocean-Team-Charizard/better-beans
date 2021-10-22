import { ApolloClient, InMemoryCache } from '@apollo/client';

// https://better-beans.vercel.app
// http://localhost:3000

const apolloClient = new ApolloClient({
  uri: 'https://better-beans.vercel.app',
  cache: new InMemoryCache(),
});

export default apolloClient;
