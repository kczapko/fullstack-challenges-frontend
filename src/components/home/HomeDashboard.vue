<template lang="pug">
.home__header
  h1 Dashboard
.home__content
  ul.dashboard
    dashboard-item(coming-soon)
      template(#logo)
        SvgLogoMyUnsplash
    dashboard-item(coming-soon name="Group Chat")
      template(#logo)
        SvgLogoChat
    dashboard-item(coming-soon name="Shoppingify")
      template(#logo)
        SvgLogoShoppingify
    dashboard-item(coming-soon name="Tweeter")
      template(#logo)
        SvgLogoTweeter
    dashboard-item(coming-soon name="Thullo")
      template(#logo)
        SvgLogoThullo
</template>

<script>
import SvgLogoMyUnsplash from '@/components/svg/LogoMyUnsplash.vue';
import SvgLogoChat from '@/components/svg/LogoChat.vue';
import SvgLogoShoppingify from '@/components/svg/LogoShoppingify.vue';
import SvgLogoTweeter from '@/components/svg/LogoTweeter.vue';
import SvgLogoThullo from '@/components/svg/LogoThullo.vue';
import DashboardItem from '@/components/home/DashboardItem.vue';

export default {
  name: 'HomeDashboard',
  components: {
    SvgLogoMyUnsplash,
    SvgLogoChat,
    SvgLogoShoppingify,
    SvgLogoTweeter,
    SvgLogoThullo,
    DashboardItem,
  },
};
</script>

<style></style>
