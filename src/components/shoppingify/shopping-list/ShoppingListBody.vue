<template lang="pug">
.shopping-list__body
    header.shopping-list__body-header
      h2.shopping-list__body-header-heading Shopping list
      base-button.shopping-list__body-header-button(
        v-if="shoppingListSaved"
        icon="edit"
        circle
        title="Edit list")
    section.shopping-list__section(v-for="(products, categoryName) in shoppingListProducts")
      h3.shopping-list__section-heading.font-500 {{ categoryName }}
      ul.shopping-list__products
        shopping-list-product(v-for="product in products" :key="product.product._id" :product="product")
</template>

<script>
import { mapGetters } from 'vuex';

import ShoppingListProduct from './ShoppingListProduct.vue';

export default {
  name: 'ShoppingListBody',
  components: {
    ShoppingListProduct,
  },
  computed: {
    ...mapGetters('shoppingify', ['shoppingListSaved', 'shoppingListProducts']),
  },
};
</script>
