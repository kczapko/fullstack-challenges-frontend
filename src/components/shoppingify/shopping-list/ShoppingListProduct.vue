<template lang="pug">
li.shopping-list__product
  .shopping-list__product-complete(v-if="shoppingListMode === 'completing'")
    label.shopping-list__product-complete-label
      input.shopping-list__product-complete-input(type="checkbox")
  .shopping-list__product-name {{ product.product.name }}
  .shopping-list__product-quantity {{ `${product.quantity} ${product.quantity === 1 ? 'pc' : 'pcs'}` }}
  .shopping-list__product-edit(v-if="editing")
    base-button.shopping-list__product-remove(icon="delete_outline" color="danger" title="Remove from list")
    base-button.shopping-list__product-decrease(icon="remove" color="primary" variant="link" title="Decrease quantity")
    .shopping-list__product-quantity {{ `${product.quantity} ${product.quantity === 1 ? 'pc' : 'pcs'}` }}
    base-button.shopping-list__product-increase(icon="add" color="primary" variant="link" title="Increase quantity")
</template>

<script>
import { mapGetters } from 'vuex';

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
};
</script>
