import axios from './axios';

const signup = async ({ email, password, passwordConfirm }) => {
  const graphqlQuery = {
    query: `
      mutation signup($email: String!, $password: String!, $passwordConfirm: String!) {
        signup(signupInput: {email: $email, password: $password, passwordConfirm: $passwordConfirm}) {
          token
          user {
            role
            email
            name
            photo
            emailConfirmed
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
            role
            email
            name
            photo
            emailConfirmed
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

const autologin = async (token) => {
  const graphqlQuery = {
    query: `
      query autologin {
        autologin {
          user {
            role
            email
            name
            photo
            emailConfirmed
          }
        }
      }
    `,
  };

  return axios.post('', graphqlQuery, { headers: { Authorization: `Bearer ${token}` } });
};

const signinWithGoogle = async (token) => {
  const graphqlQuery = {
    query: `
      mutation signinWithGoogle($token: String!) {
        signinWithGoogle(idToken: $token) { 
          token
          user {
            role
            email
            name
            photo
            emailConfirmed
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
            role
            email
            name
            photo
            emailConfirmed
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
            role
            email
            name
            photo
            emailConfirmed
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

const authWithGithub = async () => {
  const graphqlQuery = {
    query: `
      query authWithGithub {
        authWithGithub {
          url
          state
        }
      }
    `,
  };

  return axios.post('', graphqlQuery);
};

const signinWithGithub = async (code) => {
  const graphqlQuery = {
    query: `
      mutation signinWithGithub($code: String!) {
        signinWithGithub(code: $code) { 
          token
          user {    
            role
            email
            name
            photo
            emailConfirmed
          }
        }
      }
    `,
    variables: {
      code,
    },
  };

  return axios.post('', graphqlQuery);
};

const requestPasswordReset = async ({ email }) => {
  const graphqlQuery = {
    query: `
      mutation requestPasswordReset($email: String!) {
        requestPasswordReset(email: $email)
      }
    `,
    variables: {
      email,
    },
  };

  return axios.post('', graphqlQuery);
};

export {
  signup,
  login,
  autologin,
  signinWithGoogle,
  signinWithFacebook,
  authWithTwitter,
  signinWithTwitter,
  authWithGithub,
  signinWithGithub,
  requestPasswordReset,
};
