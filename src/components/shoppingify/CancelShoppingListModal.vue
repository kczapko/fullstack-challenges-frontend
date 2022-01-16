<template lang="pug">
base-modal.cancel-shopping-list__modal.base-modal--cancel-shopping-list(
  modal-title="Are you sure that you want to cancel this list?"
  ref="modal"
)
  template(#default="{ close }")
    base-button(@click="close") No
    base-button(color="danger" @click="cancel") Yes
</template>

<script>
import { mapActions } from 'vuex';

import Message from '@/utils/Message';

export default {
  name: 'CancelShoppingListModal',
  methods: {
    ...mapActions('shoppingify', ['cancelMyShoppingList']),
    ...mapActions(['addMessage']),
    open() {
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    async cancel() {
      try {
        await this.cancelMyShoppingList();
        this.addMessage(new Message('Shopping list was successfully cancelled.'));
      } catch (err) {
        this.addMessage(new Message(err.message, 'error'));
      }
      this.close();
    },
  },
};
</script>
