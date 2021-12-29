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
    product-view
</template>

<script>
import { useStore } from 'vuex';
import { ref, onUnmounted } from 'vue';

import useBodyClass from '@/hooks/useBodyClass';

import shoppingifyStore from '@/store/modules/shoppingify';

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
    ]).then(() => {
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
    toggleShoppingList() {
      this.shoppingListOpen = !this.shoppingListOpen;
    },
    openAddProduct() {
      this.$refs.newProductForm.open();
    },
  },
};
</script>
