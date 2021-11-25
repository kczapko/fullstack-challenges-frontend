<template lang="pug">
header.header
  .header__logo
    slot(name="logo")
      router-link(:to="{ name: 'home' }")
        SvgLogoDevChallenges
</template>

<script>
import SvgLogoDevChallenges from '@/components/svg/LogoDevChallenges.vue';

export default {
  name: 'BaseHeader',
  components: {
    SvgLogoDevChallenges,
  },
};
</script>

<style></style>
