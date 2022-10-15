import { createServer } from '@graphql-yoga/node';
import { buildSchema } from 'graphql';

const typeDefs = /* GraphQL */ `
  type Query {
    greeting: String!
    lazyGreeting: String!
  }
`;

const schema = buildSchema(typeDefs, {
  enableDeferStream: true,
});

const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

const server = createServer({
  schema: {
    typeDefs: schema,
    resolvers: {
      Query: {
        greeting: () => 'Hi!',

        lazyGreeting: async () => {
          await sleep();

          return "...Oh, Hi! I don't know you were here.";
        },
      },
    },
  },
});

server.start();
