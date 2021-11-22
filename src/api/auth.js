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

const signinWithFacebook = async ({ token, userId }) => {
  const graphqlQuery = {
    query: `
      mutation signinWithFacebook($token: String!, $userId: String!) {
        signinWithFacebook(accessToken: $token, userId: $userId) { 
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
      userId,
    },
  };

  return axios.post('', graphqlQuery);
};

const authWithTwitter = async () => {
  const graphqlQuery = {
    query: `
      query authWithTwitter {
        authWithTwitter 
      }
    `,
  };

  return axios.post('', graphqlQuery);
};

const signinWithTwitter = async ({ token, verifier }) => {
  const graphqlQuery = {
    query: `
      mutation signinWithTwitter($token: String!, $verifier: String!) {
        signinWithTwitter(oauthToken: $token, oauthVerifier: $verifier) { 
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
      verifier,
    },
  };

  return axios.post('', graphqlQuery);
};

// prettier-ignore
export {
  signup,
  login,
  signinWithGoogle,
  signinWithFacebook,
  authWithTwitter,
  signinWithTwitter,
};
