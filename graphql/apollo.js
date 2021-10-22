import { ApolloClient, InMemoryCache } from '@apollo/client';

// https://better-beans.vercel.app/api/graphql
// http://localhost:3000/api/graphql

const apolloClient = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});
// console.log(process.env.APOLLO_URI);

export default apolloClient;
