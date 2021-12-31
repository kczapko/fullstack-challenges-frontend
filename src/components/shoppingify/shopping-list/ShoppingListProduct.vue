<template lang="pug">
li.shopping-list__product(:class="{ 'shopping-list__product--completed': product.completed && shoppingListMode !== 'editing' }")
  .shopping-list__product-complete(v-if="shoppingListMode === 'completing'")
    label.shopping-list__product-complete-label
      input.shopping-list__product-complete-input(type="checkbox" @click="toggleProductCompletion(product.product._id)")
  .shopping-list__product-name {{ product.product.name }}
  .shopping-list__product-quantity(@click="toggleEditing") {{ `${product.quantity} ${product.quantity === 1 ? 'pc' : 'pcs'}` }}
  .shopping-list__product-edit(v-if="editing && shoppingListMode === 'editing'")
    base-button.shopping-list__product-remove(
      @click="remove(product.product._id)"
      icon="delete_outline"
      color="danger"
      title="Remove from list")
    base-button.shopping-list__product-decrease(
      @click="decrease(product.product._id)"
      :disabled="product.quantity === 1"
      icon="remove"
      color="primary"
      variant="link"
      title="Decrease quantity")
    .shopping-list__product-quantity(@click="toggleEditing") {{ `${product.quantity} ${product.quantity === 1 ? 'pc' : 'pcs'}` }}
    base-button.shopping-list__product-increase(
      @click="increase(product.product._id)"
      :disabled="product.quantity === 99"
      icon="add"
      color="primary"
      variant="link"
      title="Increase quantity")
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Message from '@/utils/Message';

export default {
  name: 'ShoppingListProduct',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editing: false,
    };
  },
  computed: {
    ...mapGetters('shoppingify', ['shoppingListMode']),
  },
  methods: {
    ...mapActions('shoppingify', {
      remove: 'removeProductFromShoppingList',
      increase: 'increaseProductQuantity',
      decrease: 'decreaseProductQuantity',
      toogleCompletion: 'toggleProductCompletion',
    }),
    ...mapActions(['addMessage']),
    toggleEditing() {
      if (this.shoppingListMode === 'editing') {
        this.editing = !this.editing;
      }
    },
    async toggleProductCompletion(id) {
      try {
        await this.toogleCompletion(id);
      } catch (err) {
        this.addMessage(new Message(err.message, 'error'));
      }
    },
  },
};
</script>
