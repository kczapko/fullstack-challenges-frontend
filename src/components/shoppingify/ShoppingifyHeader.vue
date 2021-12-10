<template lang="pug">
base-header
  template(#logo)
    router-link(:to="{ name: 'shoppingify' }" aria-label="Shoppingify")
      svg-logo-shoppingify
</template>

<script>
import SvgLogoShoppingify from '@/components/svg/LogoShoppingify.vue';

export default {
  name: 'ShoppingifyHeader',
  components: {
    SvgLogoShoppingify,
  },
};
</script>
