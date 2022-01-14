import { createClient } from 'graphql-ws';

const wsClient = createClient({
  url: 'ws://localhost:3333/graphql',
});

export default wsClient;
