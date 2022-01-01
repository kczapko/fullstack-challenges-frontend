<template lang="pug">
section.products-list
  .products-list__empty(v-if="!products.length")
    p.products-list__empty-text You don't have any products to add to the list.
    base-button.products-list__empty-button(color="primary" @click="openAddProduct") Start adding them
  .products-list__body(v-else)
    template(v-for="(products, categoryName) in categorizedProducts")
      h2.products-list__category.font-500 {{ categoryName }}
      ul.products-list__list
        li.products-list__list-item(v-for="product in products")
          button.products-list__product-name(
            :class="{ 'products-list__product-name--not-completed' : mode === 'history' && !product.completed }"
            @click="viewProduct(product._id)") {{ product.name }}
          button.products-list__add-to-list(
            v-if="mode === 'add'"
            title="Add to list"
            @click="addProductToShoppingList(product._id)")
            span.material-icons add
          span.products-list__quantity(
            :class="{ 'products-list__quantity--not-completed' : !product.completed }"
            v-if="mode === 'history'") {{ product.quantity }} {{ product.quantity === 1 ? 'pc' : 'pcs' }}
</template>

<script>
import { mapActions } from 'vuex';

import Message from '@/utils/Message';

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
    search: {
      type: String,
      default: '',
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
        const product = this.mode === 'history' ? this.products[i].product : this.products[i];

        if (this.search) {
          try {
            const regExp = new RegExp(this.search, 'gi');
            // eslint-disable-next-line no-continue
            if (!product.name.match(regExp)) continue;
          } catch (err) {
            this.addMessage(new Message('Invalid search value', 'error'));
            break;
          }
        }

        // eslint-disable-next-line no-underscore-dangle
        const category = categories[product.category._id];

        if (!products[category]) products[category] = [];
        if (this.mode === 'history') {
          products[category].push({
            ...product,
            quantity: this.products[i].quantity,
            completed: this.products[i].completed,
          });
        } else {
          products[category].push(product);
        }
      }

      Object.values(products).forEach((prods) => {
        prods.sort((a, b) => a.name.localeCompare(b.name));
      });

      const sorted = {};
      Object.keys(products)
        .sort((a, b) => a.localeCompare(b))
        .forEach((cat) => {
          sorted[cat] = products[cat];
        });

      return sorted;
    },
  },
  methods: {
    ...mapActions('shoppingify', ['addProductToShoppingList']),
    ...mapActions(['addMessage']),
  },
};
</script>
