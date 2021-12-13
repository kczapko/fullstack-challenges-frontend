<template lang="pug">
li.shopping-list__product
  .shopping-list__product-complete
    label.shopping-list__product-complete-label
      input.shopping-list__product-complete-input(type="checkbox")
  .shopping-list__product-name Avocado
  .shopping-list__product-quantity 3 pcs
  .shopping-list__product-edit
    base-button.shopping-list__product-remove(icon="delete_outline" color="danger" title="Remove from list")
    base-button.shopping-list__product-decrease(icon="remove" color="primary" variant="link" title="Decrease quantity")
    .shopping-list__product-quantity 3 pcs
    base-button.shopping-list__product-increase(icon="add" color="primary" variant="link" title="Increase quantity")
</template>

<script>
export default {
  name: 'ShoppingListProduct',
};
</script>
