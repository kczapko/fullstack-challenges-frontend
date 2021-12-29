import api from '@/api';

export default {
  namespaced: true,
  state() {
    return {
      categories: [],
      products: [],
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
  },
};
