import api from '@/api';

export default {
  namespaced: true,
  state() {
    return {
      categories: [],
      products: [],
      activeProduct: null,
      shoppingList: {
        products: [],
        mode: 'editing',
        name: '',
        _id: null,
      },
    };
  },
  mutations: {
    setCategories(state, payload) {
      state.categories = payload;
    },
    addCategory(state, payload) {
      // eslint-disable-next-line no-underscore-dangle
      const category = state.categories.find((c) => c._id === payload._id);
      if (!category) state.categories.push(payload);
    },
    setProducts(state, payload) {
      state.products = payload;
    },
    addProduct(state, payload) {
      state.products.push(payload);
    },
    removeProduct(state, payload) {
      // eslint-disable-next-line no-underscore-dangle
      const index = state.products.findIndex((p) => p._id === payload._id);
      if (index >= 0) state.products.splice(index, 1);
    },
    setActiveProduct(state, payload) {
      state.activeProduct = payload;
    },
    addProductToShoppingList(state, payload) {
      const { products } = state.shoppingList;
      // eslint-disable-next-line no-underscore-dangle
      const shoppingListProduct = products.find((p) => p.product._id === payload);

      if (shoppingListProduct) {
        shoppingListProduct.quantity += 1;
      } else {
        // eslint-disable-next-line no-underscore-dangle
        const product = state.products.find((p) => p._id === payload);
        products.push({
          product,
          quantity: 1,
          completed: false,
        });
      }
    },
  },
  actions: {
    async getMyProductCategories({ commit }) {
      const res = await api.shoppingify.myProductCategories();

      commit('setCategories', res.data.data.myShoppingifyProductCategories);
    },
    async getMyProducts({ commit }) {
      const res = await api.shoppingify.myProducts();

      commit('setProducts', res.data.data.myShoppingifyProducts);
    },
    async addMyProduct({ commit }, payload) {
      const res = await api.shoppingify.addMyProduct(payload);

      const product = res.data.data.addMyShoppingifyProduct;

      commit('addProduct', product);
      commit('addCategory', {
        // eslint-disable-next-line no-underscore-dangle
        _id: product.category._id,
        name: product.category.name,
      });
    },
    async loadMyProduct({ commit }, payload) {
      const res = await api.shoppingify.myProduct(payload);

      commit('setActiveProduct', res.data.data.myShoppingifyProduct);
    },
    async deleteMyProduct({ commit }, payload) {
      const res = await api.shoppingify.deleteMyProduct(payload);

      commit('setActiveProduct', null);
      commit('removeProduct', res.data.data.deleteMyShoppingifyProduct);
    },
    addProductToShoppingList({ commit }, payload) {
      commit('addProductToShoppingList', payload);
    },
  },
  getters: {
    shoppingListIsEmpty(state) {
      return state.shoppingList.products.length === 0;
    },
    shoppingListProductsCount(state) {
      return state.shoppingList.products.length;
    },
    shoppingListSaved(state) {
      // eslint-disable-next-line no-underscore-dangle
      return Boolean(state.shoppingList._id);
    },
    shoppingListMode(state) {
      return state.shoppingList.mode;
    },
    shoppingListProducts(state) {
      const products = {};
      const categories = {};

      for (let i = 0; i < state.categories.length; i += 1) {
        // eslint-disable-next-line no-underscore-dangle
        categories[state.categories[i]._id] = state.categories[i].name;
      }

      for (let i = 0; i < state.shoppingList.products.length; i += 1) {
        const product = state.shoppingList.products[i];
        // eslint-disable-next-line no-underscore-dangle
        const category = categories[product.product.category._id];

        if (!products[category]) products[category] = [];
        products[category].push(product);
      }

      return products;
    },
  },
};
