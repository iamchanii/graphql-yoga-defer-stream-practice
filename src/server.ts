import { createServer } from '@graphql-yoga/node';

const server = createServer({
  schema: {
    typeDefs: /* GraphQL */ `
      type Query {
        greeting: String!
      }
    `,
    resolvers: {
      Query: {
        greeting: () => 'Hi!',
      },
    },
  },
});

server.start();
