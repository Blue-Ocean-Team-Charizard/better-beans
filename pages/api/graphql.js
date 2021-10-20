import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { typeDefs, resolvers } from '../../graphql';
import { createContext } from '../../graphql/context';

const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

const startServer = apolloServer.start(() => console.log('Connected to GraphQL!'));

// eslint-disable-next-line consistent-return
export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
