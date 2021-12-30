import api from '@/api';

export default {
  namespaced: true,
  state() {
    return {
      categories: [],
      products: [],
      activeProduct: null,
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
  },
};
