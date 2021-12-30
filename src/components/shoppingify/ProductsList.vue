<template lang="pug">
section.products-list
  .products-list__empty(v-if="!products.length")
    p.products-list__empty-text You don't have any products to add to the list
    base-button.products-list__empty-button(color="primary" @click="openAddProduct") Start adding them
  .products-list__body(v-else)
    template(v-for="(products, categoryName) in categorizedProducts")
      h2.products-list__category.font-500 {{ categoryName }}
      ul.products-list__list
        li.products-list__list-item(v-for="product in products")
          a.products-list__product-name(href="#" @click="viewProduct(product._id)") {{ product.name }}
          button.products-list__add-to-list(v-if="mode === 'add'" title="Add to list")
            span.material-icons add
          span.products-list__quantity(v-if="mode === 'history'") 2 pcs
</template>

<script>
export default {
  name: 'ProductsList',
  inject: ['openAddProduct', 'viewProduct'],
  props: {
    products: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    mode: {
      type: String,
      validate(val) {
        return ['add', 'history'].includes(val);
      },
      default: 'add',
    },
  },
  computed: {
    categorizedProducts() {
      const products = {};
      const categories = {};

      for (let i = 0; i < this.categories.length; i += 1) {
        // eslint-disable-next-line no-underscore-dangle
        categories[this.categories[i]._id] = this.categories[i].name;
      }

      for (let i = 0; i < this.products.length; i += 1) {
        const product = this.products[i];
        // eslint-disable-next-line no-underscore-dangle
        const category = categories[product.category._id];

        if (!products[category]) products[category] = [];
        products[category].push(product);
      }

      return products;
    },
  },
};
</script>
