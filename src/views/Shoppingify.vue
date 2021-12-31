<template lang="pug">
svg-page-loader(v-if="!loaded")
.shoppingify(v-if="loaded")
  shoppingify-header(@cart-clicked="toggleShoppingList")
  main
    shoppingify-home
    //- shopping-history
    //- single-history
    //- shopping-statistics
  aside
    shopping-list(:class="{ 'shopping-list--open': shoppingListOpen }" @add-item-click="openAddProduct")
    new-product-form(ref="newProductForm")
    product-view(ref="productView")
</template>

<script>
import { useStore, mapActions } from 'vuex';
import { ref, onUnmounted } from 'vue';

import useBodyClass from '@/hooks/useBodyClass';

import shoppingifyStore from '@/store/modules/shoppingify';

import Message from '@/utils/Message';

import SvgPageLoader from '@/components/svg/PageLoader.vue';
import ShoppingifyHeader from '@/components/shoppingify/ShoppingifyHeader.vue';
import ShoppingList from '@/components/shoppingify/shopping-list/ShoppingList.vue';
import NewProductForm from '@/components/shoppingify/NewProductForm.vue';
import ProductView from '@/components/shoppingify/ProductView.vue';
import ShoppingifyHome from '@/components/shoppingify/ShoppingifyHome.vue';
import ShoppingHistory from '@/components/shoppingify/ShoppingHistory.vue';
import SingleHistory from '@/components/shoppingify/SingleHistory.vue';
import ShoppingStatistics from '@/components/shoppingify/ShoppingStatistics.vue';

import '@/assets/scss/modules/shoppingify/main.scss';

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
  },
  provide() {
    return {
      openAddProduct: this.openAddProduct,
      viewProduct: this.viewProduct,
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
      });

    return { loaded };
  },
  data() {
    return {
      shoppingListOpen: false,
    };
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
        await this.loadMyProduct(id);
        this.$refs.productView.open();
      } catch (err) {
        this.addMessage(
          new Message(err.message || 'Unexpected error during loading product.', 'error'),
        );
      }
    },
  },
};
</script>
