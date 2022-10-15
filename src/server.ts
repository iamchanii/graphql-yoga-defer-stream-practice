import { createServer } from '@graphql-yoga/node';
import { buildSchema } from 'graphql';

const typeDefs = /* GraphQL */ `
  type Query {
    greeting: String!
  }
`;

const schema = buildSchema(typeDefs, {
  enableDeferStream: true,
});

const server = createServer({
  schema: {
    typeDefs: schema,
    resolvers: {
      Query: {
        greeting: () => 'Hi!',
      },
    },
  },
});

server.start();
