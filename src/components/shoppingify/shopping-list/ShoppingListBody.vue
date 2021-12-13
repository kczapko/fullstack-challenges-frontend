<template lang="pug">
.shopping-list__body
    header.shopping-list__body-header
      h2.shopping-list__body-header-heading Shopping list
      base-button.shopping-list__body-header-button(icon="edit" circle title="Edit list")
    section.shopping-list__section
      h3.shopping-list__section-heading.font-500 Fruit and vegetables
      ul.shopping-list__products
        li.shopping-list__product
          .shopping-list__product-name AvocadoAvocadoAvocadoAvocadoAvocado
          .shopping-list__product-quantity 3 pcs
        li.shopping-list__product
          .shopping-list__product-complete
            label.shopping-list__product-complete-label
              input.shopping-list__product-complete-input(type="checkbox")
          .shopping-list__product-name Pre-cooked corn corn corn 450g
          .shopping-list__product-quantity 1 pc
        shopping-list-product
    section.shopping-list__section
      h3.shopping-list__section-heading.font-500 Fruit and vegetables
      ul.shopping-list__products
        li.shopping-list__product
          .shopping-list__product-name Avocado
          .shopping-list__product-quantity 3 pcs
        li.shopping-list__product.shopping-list__product--completed
          .shopping-list__product-complete
            label.shopping-list__product-complete-label
              input.shopping-list__product-complete-input(type="checkbox")
          .shopping-list__product-name Pre-cooked corn 450g
          .shopping-list__product-quantity 1 pc
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
