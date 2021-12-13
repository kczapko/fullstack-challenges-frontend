<template lang="pug">
li.shopping-list__body-section-product
  .shopping-list__body-section-product-complete
    label.shopping-list__body-section-product-complete-label
      input.shopping-list__body-section-product-complete-input(type="checkbox")
  .shopping-list__body-section-product-name Avocado
  .shopping-list__body-section-product-quantity 3pcs
  .shopping-list__body-section-product-edit
    base-button.shopping-list__body-section-product-remove(icon="delete_outline" color="danger" title="Remove from list")
    base-button.shopping-list__body-section-product-decrease(icon="remove" color="primary" variant="link" title="Decrease quantity")
    .shopping-list__body-section-product-quantity 3pcs
    base-button.shopping-list__body-section-product-increase(icon="add" color="primary" variant="link" title="Increase quantity")
</template>

<script>
export default {
  name: 'ShoppingListProduct',
};
</script>
