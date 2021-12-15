<template lang="pug">
.shoppingify
  shoppingify-header
  main
    products-list
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
import ProductsList from '@/components/shoppingify/ProductsList.vue';

import '@/assets/scss/modules/shoppingify/main.scss';

export default {
  name: 'Shoppingify',
  components: {
    ShoppingifyHeader,
    ShoppingList,
    NewProductForm,
    ProductView,
    ProductsList,
  },
  setup() {
    useBodyClass('module-shoppingify');
  },
};
</script>
