<template lang="pug">
.user-image(:title="username")
  img.user-image__img(:src="user.photo" :alt="username" v-if="user.photo && !photoLoadError" @error="photoLoadError = true")
  svg.user-image__img.user-image__img--svg(viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" v-if="!user.photo || photoLoadError")
    rect(width="50" height="50")
    text(text-anchor="middle" x="25" y="33") {{ initials }}
</template>

<script>
import { username, initials } from '../../utils/user';

export default {
  name: 'BaseUserImage',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      photoLoadError: false,
    };
  },
  computed: {
    username() {
      return username(this.user);
    },
    initials() {
      return initials(this.username);
    },
  },
};
</script>
