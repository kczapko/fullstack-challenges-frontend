import axios from './axios';

const confirmEmail = async ({ token }) => {
  const graphqlQuery = {
    query: `
      mutation confirmEmail($token: String!) {
        confirmEmail(token: $token) 
      }
    `,
    variables: {
      token,
    },
  };

  return axios.post('', graphqlQuery);
};

const resendConfirmEmail = async () => {
  const graphqlQuery = {
    query: `
      mutation resendConfirmEmail {
        resendConfirmEmail
      }
    `,
  };

  return axios.post('', graphqlQuery);
};

const myData = async () => {
  const graphqlQuery = {
    query: `
      query me {
        me {
          name
          photo
          bio
          phone
          email
        }
      }
    `,
  };

  return axios.post('', graphqlQuery);
};

export { confirmEmail, resendConfirmEmail, myData };
