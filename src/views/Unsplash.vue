<template lang="pug">
.unsplash
  base-header
    template(#logo)
      router-link(:to="{ name: 'unsplash' }")
        svg-logo-my-unsplash
  main
    p Unsplash
  base-footer
</template>

<script>
import useBodyClass from '@/hooks/useBodyClass';

import SvgLogoMyUnsplash from '@/components/svg/LogoMyUnsplash.vue';

export default {
  name: 'Unsplash',
  components: {
    SvgLogoMyUnsplash,
  },
  setup() {
    useBodyClass('module-unsplash');
  },
};
</script>
