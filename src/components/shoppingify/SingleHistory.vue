<template lang="pug">
.single-history
  .single-history__back
   a.single-history__back-link(href="#")
    span.material-icons keyboard_backspace
    |
    | Back
  header.single-history__header
    h1.single-history__title Eero’s farewell party
    time.single-history__time(datetime="2020-08-24") Mon 24.8.2020
  products-list.single-history__products-list
</template>

<script>
import ProductsList from '@/components/shoppingify/ProductsList.vue';

export default {
  name: 'ShoppingifyHome',
  components: {
    ProductsList,
  },
};
</script>
