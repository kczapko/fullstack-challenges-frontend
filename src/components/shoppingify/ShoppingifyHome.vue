<template lang="pug">
section.shoppingify-home
  header.shoppingify-home__header
    h1.shoppingify-home__title.font-500
      strong.color-primary.font-700 Shoppingify
      |
      | allows you take your shopping list wherever you go
    .shoppingify-home__search.form.form--search
      vee-form.form__form(@submit="search" v-slot="{ values }")
        .form__row
          base-input(name="search" icon="search" placeholder="Search product" @input="searchQuery = values.search.trim()")
  products-list.shoppingify-home__products-list(:products="products" :categories="categories" :search="searchQuery")
</template>

<script>
import { mapState } from 'vuex';

import ProductsList from '@/components/shoppingify/ProductsList.vue';

export default {
  name: 'ShoppingifyHome',
  components: {
    ProductsList,
  },
  data() {
    return {
      searchQuery: '',
    };
  },
  computed: {
    ...mapState('shoppingify', ['products', 'categories']),
  },
  methods: {
    search() {},
  },
};
</script>
