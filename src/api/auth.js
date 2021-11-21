import axios from './axios';

const signup = async ({ email, password, passwordConfirm }) => {
  const graphqlQuery = {
    query: `
      mutation signup($email: String!, $password: String!, $passwordConfirm: String!) {
        signup(signupInput: {email: $email, password: $password, passwordConfirm: $passwordConfirm}) {
          token
          user {
            _id
            role
            email
            name
            photo
          }
        }
      }
    `,
    variables: {
      email,
      password,
      passwordConfirm,
    },
  };

  return axios.post('', graphqlQuery);
};

const login = async ({ email, password }) => {
  const graphqlQuery = {
    query: `
      query login($email: String!, $password: String!) {
        login(loginInput: {email: $email, password: $password}) {
          token
          user {
            _id
            role
            email
            name
            photo
          }
        }
      }
    `,
    variables: {
      email,
      password,
    },
  };

  return axios.post('', graphqlQuery);
};

const signinWithGoogle = async (token) => {
  const graphqlQuery = {
    query: `
      mutation signinWithGoogle($token: String!) {
        signinWithGoogle(idToken: $token) { 
          token
          user {
            _id
            role
            email
            name
            photo
          }
        }
      }
    `,
    variables: {
      token,
    },
  };

  return axios.post('', graphqlQuery);
};

export { signup, login, signinWithGoogle };
