<template lang="pug">
.shopping-list__body
    header.shopping-list__body-header
      h2.shopping-list__body-header-heading Shopping list
      base-button.shopping-list__body-header-button(icon="edit" circle title="Edit list")
    section.shopping-list__body-section
      h3.shopping-list__body-section-heading.font-500 Fruit and vegetables
      ul.shopping-list__body-section-products
        li.shopping-list__body-section-product
          .shopping-list__body-section-product-name AvocadoAvocadoAvocadoAvocadoAvocado
          .shopping-list__body-section-product-quantity 3pcs
        li.shopping-list__body-section-product
          .shopping-list__body-section-product-complete
            label.shopping-list__body-section-product-complete-label
              input.shopping-list__body-section-product-complete-input(type="checkbox")
          .shopping-list__body-section-product-name Pre-cooked corn corn corn 450g
          .shopping-list__body-section-product-quantity 1pc
        shopping-list-product
    section.shopping-list__body-section
      h3.shopping-list__body-section-heading.font-500 Fruit and vegetables
      ul.shopping-list__body-section-products
        li.shopping-list__body-section-product
          .shopping-list__body-section-product-name Avocado
          .shopping-list__body-section-product-quantity 3pcs
        li.shopping-list__body-section-product.shopping-list__body-section-product--completed
          .shopping-list__body-section-product-complete
            label.shopping-list__body-section-product-complete-label
              input.shopping-list__body-section-product-complete-input(type="checkbox")
          .shopping-list__body-section-product-name Pre-cooked corn 450g
          .shopping-list__body-section-product-quantity 1pc
        shopping-list-product
</template>

<script>
import ShoppingListProduct from './ShoppingListProduct.vue';

export default {
  name: 'ShoppingListBody',
  components: {
    ShoppingListProduct,
  },
};
</script>
