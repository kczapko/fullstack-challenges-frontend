<template lang="pug">
ul.logo-list
  li.logo-list__item
    a.logo-list__link(href="#")
      svg-logo-google.logo-list__logo.logo-list__logo--google
  li.logo-list__item
    a.logo-list__link(href="#")
      svg-logo-facebook.logo-list__logo.logo-list__logo--facebook
  li.logo-list__item
    a.logo-list__link(href="#")
      svg-logo-twitter.logo-list__logo.logo-list__logo--twitter
  li.logo-list__item
    a.logo-list__link(href="#")
      svg-logo-github.logo-list__logo.logo-list__logo--github
</template>

<script>
import SvgLogoGoogle from '@/components/svg/LogoGoogle.vue';
import SvgLogoFacebook from '@/components/svg/LogoFacebook.vue';
import SvgLogoTwitter from '@/components/svg/LogoTwitter.vue';
import SvgLogoGithub from '@/components/svg/LogoGithub.vue';

export default {
  name: 'LogoList',
  components: {
    SvgLogoGoogle,
    SvgLogoFacebook,
    SvgLogoTwitter,
    SvgLogoGithub,
  },
};
</script>
