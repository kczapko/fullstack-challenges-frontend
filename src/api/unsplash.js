import axios from './axios';

const addPhoto = async ({ label, imageUrl }) => {
  const graphqlQuery = {
    query: `
      mutation addUnsplashImage($label: String!, $imageUrl: String!) {
        addUnsplashImage(label: $label, imageUrl: $imageUrl) {
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

export { addPhoto, myPhotos };
