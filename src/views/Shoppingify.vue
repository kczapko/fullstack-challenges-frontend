<template lang="pug">
.shoppingify
  shoppingify-header
  main
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
    p text
  aside
    //- shopping-list
    new-product-form
</template>

<script>
import useBodyClass from '@/hooks/useBodyClass';

import ShoppingifyHeader from '@/components/shoppingify/ShoppingifyHeader.vue';
import ShoppingList from '@/components/shoppingify/shopping-list/ShoppingList.vue';
import NewProductForm from '@/components/shoppingify/NewProductForm.vue';

import '@/assets/scss/modules/shoppingify/main.scss';

export default {
  name: 'Shoppingify',
  components: {
    ShoppingifyHeader,
    ShoppingList,
    NewProductForm,
  },
  setup() {
    useBodyClass('module-shoppingify');
  },
};
</script>
