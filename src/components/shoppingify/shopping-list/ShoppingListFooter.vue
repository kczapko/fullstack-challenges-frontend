<template lang="pug">
.shopping-list__footer
  .shopping-list__footer-form.form.form--save-shopping-list(v-if="mode === 'editing'")
    p.form__error(v-if="error" :title="error") {{ error }}
    vee-form.form__form(:validation-schema="schema" @submit="submit")
      .form__row
        base-input(
          :value="name"
          name="listName"
          placeholder="Enter a name")
      .form__row.form__row--submit
        base-button(type="submit" color="primary" :disabled="submitting || empty || !changed") {{ saved ? 'Update' : 'Save' }}
  .shopping-list__footer-actions(v-if="mode === 'completing'")
    base-button(@click="openCancelModal") Cancel
    base-button(color="secondary" @click="complete") Complete
    base-modal.shopping-list__modal.base-modal--cancel-shopping-list(modal-title="Are you sure that you want to cancel this list?" ref="modal")
      template(#default="{ close }")
        base-button(@click="close") Cancel
        base-button(color="danger" @click="cancel") Yes
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Message from '@/utils/Message';

export default {
  name: 'ShoppingListFooter',
  setup() {
    const schema = {
      listName: 'required|max:100',
    };

    return {
      schema,
    };
  },
  data() {
    return {
      submitting: false,
      error: '',
    };
  },
  computed: {
    ...mapGetters('shoppingify', {
      empty: 'shoppingListIsEmpty',
      saved: 'shoppingListSaved',
      mode: 'shoppingListMode',
      changed: 'shoppingListChanged',
      name: 'shoppingListName',
    }),
  },
  methods: {
    ...mapActions('shoppingify', [
      'saveMyShoppingList',
      'updateMyShoppingList',
      'completeMyShoppingList',
      'cancelMyShoppingList',
    ]),
    ...mapActions(['addMessage']),
    async submit(values) {
      this.submitting = true;
      this.error = '';

      try {
        if (this.saved) {
          await this.updateMyShoppingList(values);
          this.addMessage(new Message('Shopping list was successfully updated.'));
        } else {
          await this.saveMyShoppingList(values);
          this.addMessage(new Message('Shopping list was successfully saved.'));
        }
      } catch (err) {
        this.error = err.message;
        this.addMessage(new Message(err.message, 'error'));
      }

      this.submitting = false;
    },
    openCancelModal() {
      this.$refs.modal.open();
    },
    async complete() {
      try {
        await this.completeMyShoppingList();
        this.addMessage(new Message('Sgopping list was successfully completed.'));
      } catch (err) {
        this.addMessage(new Message(err.message, 'error'));
      }
    },
    async cancel() {
      try {
        this.$refs.modal.close();
        await this.cancelMyShoppingList();
        this.addMessage(new Message('Sgopping list was successfully cancelled.'));
      } catch (err) {
        this.addMessage(new Message(err.message, 'error'));
      }
    },
  },
};
</script>
