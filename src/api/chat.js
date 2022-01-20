import axios from './axios';
import wsClient from './wsClient';

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
        addChannel(name: $name, description: $description, isPrivate: $isPrivate, password: $password)
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

// eslint-disable-next-line object-curly-newline
const getMessages = async ({ channelId, skip, perPage, password }) => {
  const graphqlQuery = {
    query: `
      query getMessages($channelId: ID!, $skip: Int, $perPage: Int, $password: String) {
        getMessages(channelId: $channelId, skip: $skip, perPage: $perPage, password: $password) {
          total
          messages {
            _id
            message
            createdAt
            type
            meta {
              type
              url
              title
              description
              image
            }
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
      password,
    },
  };

  return axios.post('/graphql', graphqlQuery);
};

const addMessage = async ({ msg, channelId }) => {
  const graphqlQuery = {
    query: `
      mutation addMessage($msg: String!, $channelId: ID!) {
        addMessage(msg: $msg, channelId: $channelId)
      }
    `,
    variables: {
      msg,
      channelId,
    },
  };

  return axios.post('/graphql', graphqlQuery, { dontShowLoading: true });
};

const joinChannel = async ({ name, token, password = '' }, dataCallback, subscribeCallback) => {
  const graphqlQuery = {
    query: `
      subscription joinChannel($name: String!, $password: String) {
        joinChannel(name: $name, password: $password) {
          type
          error
          member {
            username
            photo
            online
          }
          channel {
            _id
            name
            description
            isPrivate
            members {
              username
              photo
              online
            }
          }
          message {
            _id
            message
            createdAt
            type
            meta {
              type
              url
              title
              description
              image
            }
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
    const unsubscribe = wsClient.subscribe(graphqlQuery, {
      next: dataCallback,
      error: reject,
      complete: resolve,
    });

    subscribeCallback(name, unsubscribe);
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
