/* eslint-disable no-underscore-dangle */
import api from '@/api';

const MAX_QUANTITY = 99;
const MIN_QUANTITY = 1;

export default {
  namespaced: true,
  state() {
    return {
      categories: [],
      products: [],
      activeProduct: null,
      shoppingList: {
        products: [],
        mode: 'editing', // or 'completing'
        changed: false,
        name: '',
        id: null,
      },
    };
  },
  mutations: {
    setCategories(state, payload) {
      state.categories = payload;
    },
    addCategory(state, payload) {
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
      const index = state.products.findIndex((p) => p._id === payload._id);
      if (index >= 0) state.products.splice(index, 1);
    },
    setActiveProduct(state, payload) {
      state.activeProduct = payload;
    },
    addProductToShoppingList(state, payload) {
      const { products } = state.shoppingList;
      const shoppingListProduct = products.find((p) => p.product._id === payload);

      if (shoppingListProduct) {
        if (shoppingListProduct.quantity < MAX_QUANTITY) shoppingListProduct.quantity += 1;
      } else {
        const product = state.products.find((p) => p._id === payload);
        products.push({
          product,
          quantity: 1,
          completed: false,
        });
      }
      state.shoppingList.changed = true;
    },
    removeProductFromShoppingList(state, payload) {
      const { products } = state.shoppingList;
      const index = products.findIndex((p) => p.product._id === payload);
      if (index >= 0) {
        products.splice(index, 1);
        state.shoppingList.changed = true;
      }
    },
    changeProductQuantity(state, payload) {
      const { products } = state.shoppingList;
      const product = products.find((p) => p.product._id === payload.id);
      if (product) {
        if (payload.decrease && product.quantity > MIN_QUANTITY) product.quantity -= 1;
        if (payload.increase && product.quantity < MAX_QUANTITY) product.quantity += 1;
        state.shoppingList.changed = true;
      }
    },
    setShoppingList(state, payload) {
      state.shoppingList.name = payload.name;

      if (payload._id) state.shoppingList.id = payload._id;
      if (payload.products) {
        state.shoppingList.products = payload.products
          .map((p) => {
            const product = state.products.find((pr) => pr._id === p.product._id);
            if (product) {
              return {
                product,
                quantity: p.quantity,
                completed: p.completed,
              };
            }
            return null;
          })
          .filter((p) => p !== null);
      }

      state.shoppingList.changed = false;
    },
    setShoppingListMode(state, payload) {
      state.shoppingList.mode = payload;
    },
    toggleProductCompletion(state, payload) {
      const product = state.shoppingList.products.find((p) => p.product._id === payload);

      if (product) product.completed = !product.completed;
    },
    resetShoppingList(state) {
      state.shoppingList = {
        products: [],
        mode: 'editing',
        changed: false,
        name: '',
        id: null,
      };
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
        _id: product.category._id,
        name: product.category.name,
      });
    },
    async loadMyProduct({ commit }, payload) {
      const res = await api.shoppingify.myProduct(payload);

      commit('setActiveProduct', res.data.data.myShoppingifyProduct);
    },
    async deleteMyProduct({ commit, dispatch, state }, payload) {
      const res = await api.shoppingify.deleteMyProduct(payload);

      commit('setActiveProduct', null);
      commit('removeProduct', res.data.data.deleteMyShoppingifyProduct);
      dispatch('removeProductFromShoppingList', res.data.data.deleteMyShoppingifyProduct._id);

      if (state.shoppingList.changed) dispatch('updateMyShoppingList');
    },
    addProductToShoppingList({ commit }, payload) {
      commit('addProductToShoppingList', payload);
    },
    removeProductFromShoppingList({ commit }, payload) {
      commit('removeProductFromShoppingList', payload);
    },
    increaseProductQuantity({ commit }, payload) {
      commit('changeProductQuantity', { id: payload, increase: true });
    },
    decreaseProductQuantity({ commit }, payload) {
      commit('changeProductQuantity', { id: payload, decrease: true });
    },
    editShoppingList({ commit }) {
      commit('setShoppingListMode', 'editing');
    },
    completeShoppingList({ commit }) {
      commit('setShoppingListMode', 'completing');
    },
    async getMyShoppingList({ commit }) {
      const res = await api.shoppingify.myShoppingList();

      const shoppingList = res.data.data.myShoppingList;

      if (shoppingList) commit('setShoppingList', shoppingList);
    },
    async saveMyShoppingList({ state, commit }, payload) {
      const products = state.shoppingList.products.map((p) => ({
        product: {
          _id: p.product._id,
        },
        quantity: p.quantity,
        completed: p.completed,
      }));

      const data = {
        name: payload.listName,
        products,
      };

      if (payload.update) {
        const res = await api.shoppingify.updateMyShoppingList(data);
        commit('setShoppingList', res.data.data.updateMyShoppingList);
      } else {
        const res = await api.shoppingify.saveMyShoppingList(data);
        commit('setShoppingList', res.data.data.saveMyShoppingList);
      }
    },
    async updateMyShoppingList({ dispatch, state }, payload) {
      dispatch('saveMyShoppingList', {
        listName: (payload && payload.listName) || state.shoppingList.name,
        update: true,
      });
    },
    async toggleProductCompletion({ state, commit }, payload) {
      const product = state.shoppingList.products.find((p) => p.product._id === payload);

      if (product) {
        const data = { id: product.product._id, completed: !product.completed };
        const res = await api.shoppingify.toggleProductCompletion(data);

        if (res.data.data.toggleShoppingifyProductCompletion) {
          commit('toggleProductCompletion', product.product._id);
        }
      }
    },
    async completeMyShoppingList({ commit }) {
      const res = await api.shoppingify.completeMyShoppingList();

      if (res.data.data.completeMyShoppingList) {
        commit('resetShoppingList');
      }
    },
    async cancelMyShoppingList({ commit }) {
      const res = await api.shoppingify.cancelMyShoppingList();

      if (res.data.data.cancelMyShoppingList) {
        commit('resetShoppingList');
      }
    },
  },
  getters: {
    shoppingListIsEmpty(state) {
      return state.shoppingList.products.length === 0;
    },
    shoppingListProductsCount(state) {
      return state.shoppingList.products.reduce((sum, product) => {
        if (product.completed) return sum;
        return sum + 1;
      }, 0);
    },
    shoppingListSaved(state) {
      return Boolean(state.shoppingList.id);
    },
    shoppingListChanged(state) {
      return state.shoppingList.changed;
    },
    shoppingListMode(state) {
      return state.shoppingList.mode;
    },
    shoppingListName(state) {
      return state.shoppingList.name;
    },
    shoppingListProducts(state) {
      const products = {};
      const categories = {};

      for (let i = 0; i < state.categories.length; i += 1) {
        categories[state.categories[i]._id] = state.categories[i].name;
      }

      for (let i = 0; i < state.shoppingList.products.length; i += 1) {
        const product = state.shoppingList.products[i];
        const category = categories[product.product.category._id];

        if (!products[category]) products[category] = [];
        products[category].push(product);
      }

      return products;
    },
  },
};
