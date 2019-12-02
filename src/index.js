import './dotEnv'; // всегда должно быть выше всех импортов
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './gql/schema';
import { resolvers } from './gql/resolvers';
import { checkAuthToken } from './helpers/token';
import { authMiddleware } from './middleware/auth';
import { formatApolloErrors } from 'apollo-server-errors';

const { PORT } = process.env;

const app = express();
app.use(authMiddleware);
app.use(function(err, req, res, next) {
  res.status(200).send({
    errors: formatApolloErrors([
      {
        name: err.code,
        message: err.code,
      },
    ]),
  });
});
app.disable('x-powered-by');

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req }) => {
    let authToken = null;
    let ctx = null;

    try {
      authToken = req.headers.authorization;

      if (authToken) {
        ctx = checkAuthToken(authToken && authToken.split(' ')[1]);
      }
    } catch (e) {
      console.warn(`Unable to authenticate using auth token: ${authToken}`);
    }

    return ctx;
  },
});

server.applyMiddleware({
  app,
});

app.listen({ port: PORT }, () => console.log(`The GraphQL server is running on port ${PORT}`));
