import axios from './axios';
import client from './wsClient';

const getChannels = async () => {
  const graphqlQuery = {
    query: `
      query getChannels {
        getChannels {
          _id
          name
          isPrivate
        }
      }
    `,
  };

  return axios.post('/graphql', graphqlQuery);
};

// eslint-disable-next-line object-curly-newline
const addChannel = async ({ name, description, isPrivate, password }) => {
  const graphqlQuery = {
    query: `
      mutation addChannel($name: String!, $description: String!, $isPrivate: Boolean, $password: String) {
        addChannel(name: $name, description: $description, isPrivate: $isPrivate, password: $password) {
          _id
          name
          isPrivate
        }
      }
    `,
    variables: {
      name,
      description,
      isPrivate,
      password,
    },
  };

  return axios.post('/graphql', graphqlQuery);
};

const getMessages = async ({ channelId, skip, perPage }) => {
  const graphqlQuery = {
    query: `
      query getMessages($channelId: ID!, $skip: Int, $perPage: Int) {
        getMessages(channelId: $channelId, skip: $skip, perPage: $perPage) {
          total
          messages {
            _id
            message
            createdAt
            user {
              username
              photo
            }
          }
        }
      }
    `,
    variables: {
      channelId,
      skip,
      perPage,
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
          createdAt
          user {
            username
            photo
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

const joinChannel = async ({ name, token, password = '' }, dataCallback, subscribeCallback) => {
  const graphqlQuery = {
    query: `
      subscription joinChannel($name: String!, $password: String) {
        joinChannel(name: $name, password: $password) {
          type
          member {
            username
            photo
          }
          channel {
            _id
            name
            description
            isPrivate
            members {
              username
              photo
            }
          }
          message {
            _id
            message
            createdAt
            user {
              username
              photo
            }
          }
        }
      }
    `,
    variables: {
      name,
      token,
      password,
    },
  };

  await new Promise((resolve, reject) => {
    // eslint-disable-next-line no-param-reassign
    const unsubscribe = client.subscribe(graphqlQuery, {
      next: dataCallback,
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
  getMessages,
  addMessage,
  joinChannel,
};
