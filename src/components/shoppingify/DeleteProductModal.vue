<template lang="pug">
base-modal.delete-product__modal.base-modal--delete-product(
  modal-title="Are you sure that you want to delete this product? It will be removed form all shopping lists, history and statistics."
  ref="modal")
  template(#default="{ close }")
    base-button(@click="close") Cancel
    base-button(color="danger" @click="deleteProduct(product._id)") Yes
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Message from '@/utils/Message';

export default {
  name: 'DeleteProductModal',
  inject: ['closeProductView'],
  computed: {
    ...mapState('shoppingify', {
      product: (state) => state.activeProduct,
    }),
  },
  methods: {
    ...mapActions('shoppingify', ['deleteMyProduct']),
    ...mapActions(['addMessage']),
    async deleteProduct(id) {
      try {
        await this.deleteMyProduct(id);
        this.addMessage(new Message('Product was successfully deleted.'));
      } catch (err) {
        this.addMessage(
          new Message(err.message || 'Unexpected error during deleting product.', 'error'),
        );
      }
      this.close();
      this.closeProductView();
    },
    open() {
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
  },
};
</script>
