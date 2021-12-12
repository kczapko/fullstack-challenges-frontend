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
    shopping-list
</template>

<script>
import useBodyClass from '@/hooks/useBodyClass';

import ShoppingifyHeader from '@/components/shoppingify/ShoppingifyHeader.vue';
import ShoppingList from '@/components/shoppingify/shopping-list/ShoppingList.vue';

import '@/assets/scss/modules/shoppingify/main.scss';

export default {
  name: 'Shoppingify',
  components: {
    ShoppingifyHeader,
    ShoppingList,
  },
  setup() {
    useBodyClass('module-shoppingify');
  },
};
</script>
