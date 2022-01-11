<template lang="pug">
svg.base-svg-icon(viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg")
  rect(width="50" height="50")
  text(text-anchor="middle" x="25" y="33") {{ initials }}
</template>

<script>
import { initials } from '../../utils/user';

export default {
  name: 'BaseSvgIcon',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    initials() {
      return initials(this.text);
    },
  },
};
</script>
