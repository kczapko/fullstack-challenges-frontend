<template lang="pug">
.shoppingify-home
  header.shoppingify-home__header
    h1.shoppingify-home__title.font-500
      strong.color-primary.font-700 Shoppingify
      |
      | allows you take your shopping list wherever you go
    .shoppingify-home__search.form.form--search
      vee-form.form__form(@submit="search")
        .form__row
          base-input(name="search" icon="search" placeholder="Search product")
  products-list.shoppingify-home__products-list
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
