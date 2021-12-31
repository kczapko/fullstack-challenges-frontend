<template lang="pug">
.shopping-list__body
    header.shopping-list__body-header
      h2.shopping-list__body-header-heading Shopping list
      base-button.shopping-list__body-header-button(
        v-if="shoppingListSaved"
        @click="toggleMode"
        :icon="shoppingListMode === 'editing' ? 'shopping_cart' : 'edit'"
        circle
        :title="shoppingListMode === 'editing' ? 'Complete list' : 'Edit list'")
    section.shopping-list__section(v-for="(products, categoryName) in shoppingListProducts")
      h3.shopping-list__section-heading.font-500 {{ categoryName }}
      ul.shopping-list__products
        shopping-list-product(v-for="product in products" :key="product.product._id" :product="product")
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Message from '@/utils/Message';

import ShoppingListProduct from './ShoppingListProduct.vue';

export default {
  name: 'ShoppingListBody',
  components: {
    ShoppingListProduct,
  },
  computed: {
    ...mapGetters('shoppingify', [
      'shoppingListSaved',
      'shoppingListProducts',
      'shoppingListMode',
      'shoppingListChanged',
    ]),
  },
  methods: {
    ...mapActions('shoppingify', [
      'editShoppingList',
      'completeShoppingList',
      'updateMyShoppingList',
    ]),
    ...mapActions(['addMessage']),
    async toggleMode() {
      if (this.shoppingListMode === 'editing') {
        if (this.shoppingListChanged) {
          try {
            await this.updateMyShoppingList();
            this.completeShoppingList();
          } catch (err) {
            this.addMessage(new Message(err.message, 'error'));
          }
        } else {
          this.completeShoppingList();
        }
      } else {
        this.editShoppingList();
      }
    },
  },
};
</script>
