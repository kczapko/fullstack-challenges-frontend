import axios from './axios';
import client from './wsClient';

const getChannels = async () => {
  const graphqlQuery = {
    query: `
      query getChannels {
        getChannels {
          _id
          name
        }
      }
    `,
  };

  return axios.post('/graphql', graphqlQuery);
};

const addChannel = async ({ name, description }) => {
  const graphqlQuery = {
    query: `
      mutation addChannel($name: String!, $description: String!) {
        addChannel(name: $name, description: $description) {
          _id
          name
        }
      }
    `,
    variables: {
      name,
      description,
    },
  };

  return axios.post('/graphql', graphqlQuery);
};

const addMessage = async ({ msg, channelId }) => {
  const graphqlQuery = {
    query: `
      mutation addMessage($msg: String!, $channelId: ID!) {
        addMessage(msg: $msg, channelId: $channelId) {
          _id
          message
          user {
            username
            photo
          }
          channel {
            _id
            name
          }
        }
      }
    `,
    variables: {
      msg,
      channelId,
    },
  };

  return axios.post('/graphql', graphqlQuery);
};

const joinChannel = async ({ name, token }, callback, subscribeCallback) => {
  const graphqlQuery = {
    query: `
      subscription joinChannel($name: String!) {
        joinChannel(name: $name) {
          type
          member {
            username
            photo
          }
          channel {
            _id
            name
            description
            members {
              username
              photo
            }
          }
          message {
            _id
            message
            user {
              username
              photo
            }
            channel {
              _id
              name
            }
          }
        }
      }
    `,
    variables: {
      name,
      token,
    },
  };

  await new Promise((resolve, reject) => {
    // eslint-disable-next-line no-param-reassign
    const unsubscribe = client.subscribe(graphqlQuery, {
      next: callback,
      error: reject,
      complete: resolve,
    });

    subscribeCallback(unsubscribe);
  });
};

// prettier-ignore
export {
  getChannels,
  addChannel,
  addMessage,
  joinChannel,
};
