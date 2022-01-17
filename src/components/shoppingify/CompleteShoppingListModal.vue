<template lang="pug">
base-modal.complete-shopping-list__modal.base-modal--complete-shopping-list(
  modal-title="You didn't buy all products. Are you sure that you want to complete this list?"
  ref="modal"
)
  template(#default="{ close }")
    base-button(@click="close") No
    base-button(color="danger" @click="complete") Yes
</template>

<script>
import { mapActions } from 'vuex';

import Message from '@/utils/Message';

export default {
  name: 'CompleteShoppingListModal',
  methods: {
    ...mapActions('shoppingify', ['completeMyShoppingList']),
    ...mapActions(['addMessage']),
    open() {
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    async complete() {
      try {
        await this.completeMyShoppingList();
        this.addMessage(new Message('Shopping list was successfully completed.'));
      } catch (err) {
        this.addMessage(new Message(err.message, 'error'));
      }
      this.close();
    },
  },
};
</script>
