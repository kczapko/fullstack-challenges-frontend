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
          newEmail
        }
      }
    `,
  };

  return axios.post('', graphqlQuery);
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

  return axios.post('', graphqlQuery);
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

  return axios.post('', graphqlQuery);
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

  return axios.post('', graphqlQuery);
};

const cancelMyNewEmail = async () => {
  const graphqlQuery = {
    query: `
      mutation cancelMyNewEmail {
        cancelMyNewEmail
      }
    `,
  };

  return axios.post('', graphqlQuery);
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

  return axios.post('', graphqlQuery);
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

  return axios.post('', graphqlQuery);
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
  deleteMyAccount,
};
