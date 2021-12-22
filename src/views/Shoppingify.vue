<template lang="pug">
.shoppingify
  shoppingify-header
  main
    //- shoppingify-home
    //- shopping-history
    single-history
  //- aside
    //- shopping-list
    //- new-product-form
    //- product-view
</template>

<script>
import useBodyClass from '@/hooks/useBodyClass';

import ShoppingifyHeader from '@/components/shoppingify/ShoppingifyHeader.vue';
import ShoppingList from '@/components/shoppingify/shopping-list/ShoppingList.vue';
import NewProductForm from '@/components/shoppingify/NewProductForm.vue';
import ProductView from '@/components/shoppingify/ProductView.vue';
import ShoppingifyHome from '@/components/shoppingify/ShoppingifyHome.vue';
import ShoppingHistory from '@/components/shoppingify/ShoppingHistory.vue';
import SingleHistory from '@/components/shoppingify/SingleHistory.vue';

import '@/assets/scss/modules/shoppingify/main.scss';

export default {
  name: 'Shoppingify',
  components: {
    ShoppingifyHeader,
    ShoppingList,
    NewProductForm,
    ProductView,
    ShoppingifyHome,
    ShoppingHistory,
    SingleHistory,
  },
  setup() {
    useBodyClass('module-shoppingify');
  },
};
</script>
