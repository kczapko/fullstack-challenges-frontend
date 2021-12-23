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

export { myProductCategories, myProducts };
