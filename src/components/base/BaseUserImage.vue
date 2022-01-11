<template lang="pug">
.user-image(:title="username")
  img.user-image__img(:src="user.photo" :alt="username" v-if="user.photo && !photoLoadError" @error="photoLoadError = true")
  base-svg-icon.user-image__img.user-image__img--svg(:text="username" v-if="!user.photo || photoLoadError")
</template>

<script>
import { username } from '../../utils/user';

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
  },
};
</script>
