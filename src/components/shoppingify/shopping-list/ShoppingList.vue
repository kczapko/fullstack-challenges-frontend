<template lang="pug">
section.shopping-list
  //- section.shopping-list.shopping-list--empty
  .shopping-list__container
    .shopping-list__add-item
      p.shopping-list__add-item-text.font-700 Didn’t find what you need?
      base-button.shopping-list__add-item-button.font-700 Add item
    //- .shopping-list__empty
    //-   p.shopping-list__empty-text.font-700 No items
    shopping-list-body
  shopping-list-footer
</template>

<script>
import ShoppingListBody from './ShoppingListBody.vue';
import ShoppingListFooter from './ShoppingListFooter.vue';

export default {
  name: 'ShoppingList',
  components: {
    ShoppingListFooter,
    ShoppingListBody,
  },
};
</script>
