<template lang="pug">
.shopping-list__footer
  .shopping-list__footer-form.form.form--save-shopping-list(v-if="mode === 'editing'")
    p.form__error(v-if="error" :title="error") {{ error }}
    vee-form.form__form(:validation-schema="schema" @submit="submit")
      .form__row
        base-input(
          :value="name"
          name="listName"
          autocomplete="off"
          placeholder="Enter a name")
      .form__row.form__row--submit
        base-button(type="submit" color="primary" :disabled="submitting || empty || !changed") {{ saved ? 'Update' : 'Save' }}
  .shopping-list__footer-actions(v-if="mode === 'completing'")
    base-button(@click="cancel") Cancel
    base-button(color="secondary" @click="complete") Complete
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Message from '@/utils/Message';

export default {
  name: 'ShoppingListFooter',
  inject: ['openCancelShoppingListModal', 'openCompleteShoppingListModal'],
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
      allProductsBought: 'allProductsBought',
    }),
  },
  methods: {
    ...mapActions('shoppingify', [
      'saveMyShoppingList',
      'updateMyShoppingList',
      'completeMyShoppingList',
      'editShoppingList',
      'completeShoppingList',
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
        this.completeShoppingList();
      } catch (err) {
        this.error = err.message;
        this.addMessage(new Message(err.message, 'error'));
      }

      this.submitting = false;
    },
    async complete() {
      if (this.empty) {
        this.addMessage(new Message("You can't complete empty shopping list!", 'error'));
        this.editShoppingList();
        return;
      }

      if (!this.allProductsBought) {
        this.openCompleteShoppingListModal();
        return;
      }

      try {
        await this.completeMyShoppingList();
        this.addMessage(new Message('Shopping list was successfully completed.'));
      } catch (err) {
        this.addMessage(new Message(err.message, 'error'));
      }
    },
    async cancel() {
      if (this.empty) {
        this.addMessage(new Message("You can't cancel empty shopping list!", 'error'));
        this.editShoppingList();
        return;
      }
      this.openCancelShoppingListModal();
    },
  },
};
</script>
