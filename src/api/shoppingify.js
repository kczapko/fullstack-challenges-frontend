import axios from './axios';

const myProductCategories = async () => {
  const graphqlQuery = {
    query: `
      query myShoppingifyProductCategories {
        myShoppingifyProductCategories {
          _id
          name
        }
      }
    `,
  };

  return axios.post('/graphql', graphqlQuery);
};

const myProducts = async () => {
  const graphqlQuery = {
    query: `
      query myShoppingifyProducts {
        myShoppingifyProducts {
          _id
          name
          category {
            _id
          }
        }
      }
    `,
  };

  return axios.post('/graphql', graphqlQuery);
};

// eslint-disable-next-line object-curly-newline
const addMyProduct = async ({ name, note, imageUrl, category }) => {
  const graphqlQuery = {
    query: `
      mutation addMyShoppingifyProduct($name: String!, $note: String, $imageUrl: String, $category: String!) {
        addMyShoppingifyProduct(productInput: {name: $name, note: $note, imageUrl: $imageUrl, category: $category}) {
          _id
          name
          category {
            _id
            name
          }
        }
      }
    `,
    variables: {
      name,
      note,
      imageUrl,
      category,
    },
  };

  return axios.post('/graphql', graphqlQuery);
};

export { myProductCategories, myProducts, addMyProduct };
