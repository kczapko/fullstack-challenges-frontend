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
    setProducts(state, payload) {
      state.products = payload;
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
  },
};
