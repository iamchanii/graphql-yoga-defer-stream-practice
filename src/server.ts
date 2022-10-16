import { createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { renderGraphiQL } from './renderGraphiQL';

const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

const schema = createSchema({
  typeDefs: [/* GraphQL */ `
    type Query {
      greeting: String!
      lazyGreeting: String!
    }
  `],
  resolvers: {
    Query: {
      greeting: () => 'Hi!',

      lazyGreeting: async function() {
        await sleep();

        return "...Oh, Hi! I don't know you were here.";
      },
    },
  },
  enableDeferStream: true,
});

const yoga = createYoga({
  schema,
  renderGraphiQL,
});

const server = createServer(yoga);
server.listen(4000, '0.0.0.0', () => {
  console.log('Server listening on http://localhost:4000/graphql');
});
