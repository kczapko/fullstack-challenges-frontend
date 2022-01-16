<template lang="pug">
section.product-view(:class="{ 'product-view--open' : isOpen }")
  template(v-if="product")
    .product-view__back
      a.product-view__back-link(href="#" @click.prevent="close")
        span.material-icons keyboard_backspace
        |
        | Back
    .product-view__image(v-if="product.image")
      img.product-view__image-img(:src="product.image")
    dl.product-view__description
      dt.product-view__description-title name
      dd.product-view__description-value
        h2.product-view__product-name.font-500 {{ product.name }}
      dt.product-view__description-title category
      dd.product-view__description-value {{ product.category.name }}
      dt.product-view__description-title(v-if="product.note") note
      dd.product-view__description-value(v-if="product.note") {{ product.note }}
    footer.product-view__footer
      base-button(@click="openDeleteProductModal") Delete
      base-button(color="primary" @click="addProductToShoppingList(product._id); close()") Add to list
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProductView',
  inject: ['openDeleteProductModal'],
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapState('shoppingify', {
      product: (state) => state.activeProduct,
    }),
  },
  methods: {
    ...mapActions('shoppingify', ['addProductToShoppingList']),
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
  },
};
</script>
