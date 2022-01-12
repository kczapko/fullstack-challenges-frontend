import { createClient } from 'graphql-ws';

export default createClient({
  url: 'ws://localhost:3333/graphql',
});
