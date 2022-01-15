import { createClient } from 'graphql-ws';

const wsClient = createClient({
  url: 'wss://localhost:3443/graphql',
});

export default wsClient;
