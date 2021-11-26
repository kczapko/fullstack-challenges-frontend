<template lang="pug">
.home__header
  h1 Dashboard
.home__content
  SvgLogoMyUnsplash
  SvgLogoChat
  SvgLogoShoppingify
  SvgLogoTweeter
  SvgLogoThullo
</template>

<script>
import SvgLogoMyUnsplash from '@/components/svg/LogoMyUnsplash.vue';
import SvgLogoChat from '@/components/svg/LogoChat.vue';
import SvgLogoShoppingify from '@/components/svg/LogoShoppingify.vue';
import SvgLogoTweeter from '@/components/svg/LogoTweeter.vue';
import SvgLogoThullo from '@/components/svg/LogoThullo.vue';

export default {
  name: 'HomeDashboard',
  components: {
    SvgLogoMyUnsplash,
    SvgLogoChat,
    SvgLogoShoppingify,
    SvgLogoTweeter,
    SvgLogoThullo,
  },
};
</script>

<style></style>
