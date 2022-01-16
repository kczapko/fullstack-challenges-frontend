<template lang="pug">
svg-page-loader(v-if="!loaded")
.shoppingify(v-if="loaded")
  shoppingify-header(@cart-clicked="toggleShoppingList")
  main
    transition(name="fade" mode="out-in")
      component(:is="pageComponent")
  aside
    shopping-list(:class="{ 'shopping-list--open': shoppingListOpen }")
    new-product-form(ref="newProductForm")
    product-view(ref="productView")
  //- modals
  delete-product-modal.shoppingify__modal(ref="deleteProductModal")
  complete-shopping-list-modal.shoppingify__modal(ref="completeShoppingListModal")
  cancel-shopping-list-modal.shoppingify__modal(ref="cancelShoppingListModal")
</template>

<script>
import { useStore, mapState, mapActions } from 'vuex';
import { ref, onUnmounted, defineAsyncComponent } from 'vue';

import useBodyClass from '@/hooks/useBodyClass';

import shoppingifyStore from '@/store/modules/shoppingify';

import Message from '@/utils/Message';

import SvgPageLoader from '@/components/svg/PageLoader.vue';
import ShoppingifyHeader from '@/components/shoppingify/ShoppingifyHeader.vue';
import ShoppingList from '@/components/shoppingify/shopping-list/ShoppingList.vue';
import NewProductForm from '@/components/shoppingify/NewProductForm.vue';
import ProductView from '@/components/shoppingify/ProductView.vue';
import DeleteProductModal from '@/components/shoppingify/DeleteProductModal.vue';
import CompleteShoppingListModal from '@/components/shoppingify/CompleteShoppingListModal.vue';
import CancelShoppingListModal from '@/components/shoppingify/CancelShoppingListModal.vue';

import '@/assets/scss/modules/shoppingify/main.scss';

// prettier-ignore
const ShoppingifyHome = defineAsyncComponent(() => import(/* webpackChunkName: "shoppingify-home" */ '@/components/shoppingify/ShoppingifyHome.vue'));
// prettier-ignore
const ShoppingHistory = defineAsyncComponent(() => import(/* webpackChunkName: "shoppingify-history" */ '@/components/shoppingify/ShoppingHistory.vue'));
// prettier-ignore
const SingleHistory = defineAsyncComponent(() => import(/* webpackChunkName: "shoppingify-single-history" */ '@/components/shoppingify/SingleHistory.vue'));
// prettier-ignore
const ShoppingStatistics = defineAsyncComponent(() => import(/* webpackChunkName: "shoppingify-statistics" */ '@/components/shoppingify/ShoppingStatistics.vue'));

export default {
  name: 'Shoppingify',
  components: {
    SvgPageLoader,
    ShoppingifyHeader,
    ShoppingList,
    NewProductForm,
    ProductView,
    ShoppingifyHome,
    ShoppingHistory,
    SingleHistory,
    ShoppingStatistics,
    DeleteProductModal,
    CompleteShoppingListModal,
    CancelShoppingListModal,
  },
  provide() {
    return {
      openAddProduct: this.openAddProduct,
      viewProduct: this.viewProduct,
      openProductView: this.openProductView,
      closeProductView: this.closeProductView,
      openDeleteProductModal: this.openDeleteProductModal,
      openCompleteShoppingListModal: this.openCompleteShoppingListModal,
      openCancelShoppingListModal: this.openCancelShoppingListModal,
    };
  },
  props: {
    action: {
      type: String,
      required: true,
    },
  },
  setup() {
    useBodyClass('module-shoppingify');

    const store = useStore();
    store.registerModule('shoppingify', shoppingifyStore);

    onUnmounted(() => {
      store.unregisterModule('shoppingify');
    });

    const loaded = ref(false);

    Promise.all([
      store.dispatch('shoppingify/getMyProductCategories'),
      store.dispatch('shoppingify/getMyProducts'),
    ])
      .then(() => store.dispatch('shoppingify/getMyShoppingList'))
      .then(() => {
        loaded.value = true;
      })
      .catch((err) => {
        store.dispatch('addMessage', new Message(err.message, 'error'));
      });

    return { loaded };
  },
  data() {
    return {
      shoppingListOpen: false,
    };
  },
  computed: {
    ...mapState('shoppingify', ['activeProduct']),
    pageComponent() {
      if (this.action === 'history') return ShoppingHistory;
      if (this.action === 'single-history') return SingleHistory;
      if (this.action === 'statistics') return ShoppingStatistics;
      return ShoppingifyHome;
    },
  },
  methods: {
    ...mapActions('shoppingify', ['loadMyProduct']),
    ...mapActions(['addMessage']),
    toggleShoppingList() {
      this.shoppingListOpen = !this.shoppingListOpen;
    },
    openAddProduct() {
      this.$refs.newProductForm.open();
    },
    async viewProduct(id) {
      try {
        // eslint-disable-next-line no-underscore-dangle
        if (!this.activeProduct || !(this.activeProduct._id === id)) await this.loadMyProduct(id);
        this.openProductView();
      } catch (err) {
        this.addMessage(
          new Message(err.message || 'Unexpected error during loading product.', 'error'),
        );
      }
    },
    openDeleteProductModal(product) {
      this.$refs.deleteProductModal.open(product);
    },
    openProductView() {
      this.$refs.productView.open();
    },
    closeProductView() {
      this.$refs.productView.close();
    },
    openCompleteShoppingListModal() {
      this.$refs.completeShoppingListModal.open();
    },
    openCancelShoppingListModal() {
      this.$refs.cancelShoppingListModal.open();
    },
  },
};
</script>
