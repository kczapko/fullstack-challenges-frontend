import { createClient } from 'graphql-ws';

const wsClient = createClient({
  url:
    process.env.NODE_ENV === 'development'
      ? 'wss://localhost:3443/graphql'
      : 'wss://fullstack.kczapko.pl:3443/graphql',
});

export default wsClient;
