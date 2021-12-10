<template lang="pug">
.home__header
  h1 Dashboard
.home__content
  ul.dashboard
    home-dashboard-item(:to="{ name: 'unsplash' }")
      template(#logo)
        SvgLogoMyUnsplash
    home-dashboard-item(coming-soon name="Group Chat")
      template(#logo)
        SvgLogoChat
    home-dashboard-item(:to="{ name: 'shoppingify' }" name="Shoppingify")
      template(#logo)
        SvgLogoShoppingify
    home-dashboard-item(coming-soon name="Tweeter")
      template(#logo)
        SvgLogoTweeter
    home-dashboard-item(coming-soon name="Thullo")
      template(#logo)
        SvgLogoThullo
</template>

<script>
import SvgLogoMyUnsplash from '@/components/svg/LogoMyUnsplash.vue';
import SvgLogoChat from '@/components/svg/LogoChat.vue';
import SvgLogoShoppingify from '@/components/svg/LogoShoppingify.vue';
import SvgLogoTweeter from '@/components/svg/LogoTweeter.vue';
import SvgLogoThullo from '@/components/svg/LogoThullo.vue';
import HomeDashboardItem from '@/components/home/HomeDashboardItem.vue';

export default {
  name: 'HomeDashboard',
  components: {
    SvgLogoMyUnsplash,
    SvgLogoChat,
    SvgLogoShoppingify,
    SvgLogoTweeter,
    SvgLogoThullo,
    HomeDashboardItem,
  },
};
</script>
