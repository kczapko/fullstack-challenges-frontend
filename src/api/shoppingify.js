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

const myProduct = async (id) => {
  const graphqlQuery = {
    query: `
      query myShoppingifyProduct($id: ID!) {
        myShoppingifyProduct(id: $id) {
          _id
          name
          note
          image
          category {
            name
          }
        }
      }
    `,
    variables: {
      id,
    },
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

const deleteMyProduct = async (id) => {
  const graphqlQuery = {
    query: `
      mutation deleteMyShoppingifyProduct($id: ID!) {
        deleteMyShoppingifyProduct(id: $id) {
          _id
        }
      }
    `,
    variables: {
      id,
    },
  };

  return axios.post('/graphql', graphqlQuery);
};

const myShoppingList = async () => {
  const graphqlQuery = {
    query: `
      query myShoppingList {
        myShoppingList {
          _id
          name
          products {
            product {
              _id
            }
            quantity
            completed
          }
        }
      }
    `,
  };

  return axios.post('/graphql', graphqlQuery);
};

const saveMyShoppingList = async ({ name, products }) => {
  const graphqlQuery = {
    query: `
      mutation saveMyShoppingList($name: String!, $products: [ShoppingListProductsInputData!]!) {
        saveMyShoppingList(shoppingListInput: {name: $name, products: $products}) {
          _id
          name
        }
      }
    `,
    variables: {
      name,
      products,
    },
  };

  return axios.post('/graphql', graphqlQuery);
};

const updateMyShoppingList = async ({ name, products }) => {
  const graphqlQuery = {
    query: `
      mutation updateMyShoppingList($name: String!, $products: [ShoppingListProductsInputData!]!) {
        updateMyShoppingList(shoppingListInput: {name: $name, products: $products}) {
          name
        }
      }
    `,
    variables: {
      name,
      products,
    },
  };

  return axios.post('/graphql', graphqlQuery);
};

const toggleProductCompletion = async ({ id, completed }) => {
  const graphqlQuery = {
    query: `
      mutation toggleShoppingifyProductCompletion($id: ID!, $completed: Boolean!) {
        toggleShoppingifyProductCompletion(id: $id, completed: $completed)
      }
    `,
    variables: {
      id,
      completed,
    },
  };

  return axios.post('/graphql', graphqlQuery);
};

const completeMyShoppingList = async () => {
  const graphqlQuery = {
    query: `
      mutation completeMyShoppingList {
        completeMyShoppingList
      }
    `,
  };

  return axios.post('/graphql', graphqlQuery);
};

const cancelMyShoppingList = async () => {
  const graphqlQuery = {
    query: `
      mutation cancelMyShoppingList {
        cancelMyShoppingList
      }
    `,
  };

  return axios.post('/graphql', graphqlQuery);
};

export {
  myProductCategories,
  myProducts,
  addMyProduct,
  myProduct,
  deleteMyProduct,
  myShoppingList,
  saveMyShoppingList,
  updateMyShoppingList,
  toggleProductCompletion,
  completeMyShoppingList,
  cancelMyShoppingList,
};
