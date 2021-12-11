<template lang="pug">
base-header
  template(#logo)
    router-link(:to="{ name: 'shoppingify' }" aria-label="Shoppingify")
      svg-logo-shoppingify
  template(#default)
    nav.header__nav
      ul.header__nav-list
        li.header__nav-list-item
          router-link.header__nav-link.header__nav-link--items(:to="{ name: 'shoppingify' }")
            span.header__nav-link-icon.material-icons format_list_bulleted
            span.header__nav-link-text items
        li.header__nav-list-item
          router-link.header__nav-link.header__nav-link--history(:to="{ name: 'shoppingify-history' }")
            span.header__nav-link-icon.material-icons refresh
            span.header__nav-link-text history
        li.header__nav-list-item
          router-link.header__nav-link.header__nav-link--statistics(:to="{ name: 'shoppingify-statistics' }")
            span.header__nav-link-icon.material-icons insert_chart_outlined
            span.header__nav-link-text statistics
    .header__cart
      span.header__cart-icon.material-icons-outlined shopping_cart
      span.header__cart-count 4
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
