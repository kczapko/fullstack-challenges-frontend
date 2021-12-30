<template lang="pug">
section.shopping-list(:class="{ 'shopping-list--empty' : empty }")
  .shopping-list__container
    .shopping-list__add-item
      p.shopping-list__add-item-text.font-700 Didn’t find what you need?
      base-button.shopping-list__add-item-button.font-700(@click="$emit('add-item-click')") Add item
    .shopping-list__empty(v-if="empty")
      p.shopping-list__empty-text.font-700 No items
    shopping-list-body(v-else)
  shopping-list-footer
</template>

<script>
import { mapGetters } from 'vuex';

import ShoppingListBody from './ShoppingListBody.vue';
import ShoppingListFooter from './ShoppingListFooter.vue';

export default {
  name: 'ShoppingList',
  components: {
    ShoppingListFooter,
    ShoppingListBody,
  },
  emits: ['add-item-click'],
  computed: {
    ...mapGetters('shoppingify', {
      empty: 'shoppingListIsEmpty',
    }),
  },
};
</script>
