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

  return axios.post('/graphql', graphqlQuery);
};

const resendConfirmEmail = async () => {
  const graphqlQuery = {
    query: `
      mutation resendConfirmEmail {
        resendConfirmEmail
      }
    `,
  };

  return axios.post('/graphql', graphqlQuery);
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
          newEmail
        }
      }
    `,
  };

  return axios.post('/graphql', graphqlQuery);
};

const changeMyData = async ({ name, bio, phone }) => {
  const graphqlQuery = {
    query: `
      mutation changeMyData($name: String, $bio: String, $phone: String) {
        changeMyData(userDataInput: {name: $name, bio: $bio, phone: $phone}) {
          name
        }
      }
    `,
    variables: {
      name,
      bio,
      phone,
    },
  };

  return axios.post('/graphql', graphqlQuery);
};

const changeMyPassword = async ({ currentPassword, password, passwordConfirm }) => {
  const graphqlQuery = {
    query: `
      mutation changeMyPassword($currentPassword: String!, $password: String!, $passwordConfirm: String!) {
        changeMyPassword(changeMyPasswordInput: {currentPassword: $currentPassword, password: $password, passwordConfirm: $passwordConfirm})
      }
    `,
    variables: {
      currentPassword,
      password,
      passwordConfirm,
    },
  };

  return axios.post('/graphql', graphqlQuery);
};

const changeMyEmail = async ({ email }) => {
  const graphqlQuery = {
    query: `
      mutation changeMyEmail( $email: String!) {
        changeMyEmail(email: $email)
      }
    `,
    variables: {
      email,
    },
  };

  return axios.post('/graphql', graphqlQuery);
};

const cancelMyNewEmail = async () => {
  const graphqlQuery = {
    query: `
      mutation cancelMyNewEmail {
        cancelMyNewEmail
      }
    `,
  };

  return axios.post('/graphql', graphqlQuery);
};

const confirmMyNewEmail = async ({ currentEmailToken, newEmailtoken }) => {
  const graphqlQuery = {
    query: `
      mutation confirmMyNewEmail($currentEmailToken: String!, $newEmailtoken: String!) {
        confirmMyNewEmail(currentEmailToken: $currentEmailToken, newEmailtoken: $newEmailtoken) {
          email
        }
      }
    `,
    variables: {
      currentEmailToken,
      newEmailtoken,
    },
  };

  return axios.post('/graphql', graphqlQuery);
};

const deleteMyPhoto = async () => {
  const graphqlQuery = {
    query: `
      mutation deleteMyPhoto {
        deleteMyPhoto
      }
    `,
  };

  return axios.post('/graphql', graphqlQuery);
};

const changeMyPhoto = async ({ imageUrl }) => {
  const graphqlQuery = {
    query: `
      mutation changeMyPhoto( $imageUrl: String!) {
        changeMyPhoto(imageUrl: $imageUrl) {
          photo
        }
      }
    `,
    variables: {
      imageUrl,
    },
  };

  return axios.post('/graphql', graphqlQuery);
};

const deleteMyAccount = async ({ password }) => {
  const graphqlQuery = {
    query: `
      mutation deleteMyAccount( $password: String!) {
        deleteMyAccount(password: $password)
      }
    `,
    variables: {
      password,
    },
  };

  return axios.post('/graphql', graphqlQuery);
};

export {
  confirmEmail,
  resendConfirmEmail,
  myData,
  changeMyData,
  changeMyPassword,
  changeMyEmail,
  cancelMyNewEmail,
  confirmMyNewEmail,
  changeMyPhoto,
  deleteMyPhoto,
  deleteMyAccount,
};
