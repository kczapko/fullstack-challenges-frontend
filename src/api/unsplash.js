import axios from './axios';

const addPhoto = async ({ label, imageUrl }) => {
  const graphqlQuery = {
    query: `
      mutation addMyUnsplashImage($label: String!, $imageUrl: String!) {
        addMyUnsplashImage(label: $label, imageUrl: $imageUrl) {
          _id
          path
          source
          width
          height
          label
        }
      }
    `,
    variables: {
      label,
      imageUrl,
    },
  };

  return axios.post('/graphql', graphqlQuery);
};

const myPhotos = async () => {
  const graphqlQuery = {
    query: `
      query myUnsplashImages {
        myUnsplashImages {
          _id
          path
          source
          width
          height
          label
        }
      }
    `,
  };

  return axios.post('/graphql', graphqlQuery);
};

const editPhoto = async ({ id, label }) => {
  const graphqlQuery = {
    query: `
      mutation editMyUnsplashImage($id: ID!, $label: String!) {
        editMyUnsplashImage(id: $id, label: $label) {
          _id
          label
        }
      }
    `,
    variables: {
      id,
      label,
    },
  };

  return axios.post('/graphql', graphqlQuery);
};

const deletePhoto = async ({ id, password }) => {
  const graphqlQuery = {
    query: `
      mutation deleteMyUnsplashImage($id: ID!, $password: String!) {
        deleteMyUnsplashImage(id: $id, password: $password) {
          _id
        }
      }
    `,
    variables: {
      id,
      password,
    },
  };

  return axios.post('/graphql', graphqlQuery);
};

// prettier-ignore
export {
  addPhoto,
  myPhotos,
  editPhoto,
  deletePhoto,
};
