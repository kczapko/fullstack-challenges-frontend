<template lang="pug">
.shoppingify
  shoppingify-header
</template>

<script>
import useBodyClass from '@/hooks/useBodyClass';

import ShoppingifyHeader from '@/components/shoppingify/ShoppingifyHeader.vue';

import '@/assets/scss/modules/shoppingify/main.scss';

export default {
  name: 'Shoppingify',
  components: {
    ShoppingifyHeader,
  },
  setup() {
    useBodyClass('module-shoppingify');
  },
};
</script>
