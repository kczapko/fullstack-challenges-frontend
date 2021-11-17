<template lang="pug">
section.auth
  .auth__container
    header.auth__header
      .auth__header-logo
        svg-logo-dev-challenges
    component.auth__form(:is="formComponent")
  base-footer.auth__footer
</template>

<script>
import { mapActions } from 'vuex';

import SvgLogoDevChallenges from '@/components/svg/LogoDevChallenges.vue';
import SignupForm from '@/components/auth/SignupForm.vue';
import LoginForm from '@/components/auth/LoginForm.vue';

export default {
  name: 'Auth',
  components: {
    SvgLogoDevChallenges,
  },
  props: {
    action: {
      type: String,
      required: true,
      validator(val) {
        return ['login', 'signup'].includes(val);
      },
    },
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    formComponent() {
      if (this.action === 'login') return LoginForm;
      return SignupForm;
    },
  },
  watch: {
    title: {
      handler(val) {
        this.setPageTitle(val);
      },
      immediate: true,
    },
  },
  mounted() {
    this.addBodyClass('module-auth');
  },
  unmounted() {
    this.removeBodyClass('module-auth');
  },
  methods: {
    ...mapActions(['setPageTitle', 'addBodyClass', 'removeBodyClass']),
  },
};
</script>
