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
import useBodyClass from '@/hooks/useBodyClass';

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
  },
  setup() {
    useBodyClass('module-auth');
  },
  data() {
    return {
      googleScript: null,
      facebookScript: null,
    };
  },
  computed: {
    formComponent() {
      if (this.action === 'signup') return SignupForm;
      return LoginForm;
    },
  },
  mounted() {
    this.addGoogleScript();
    this.addFacebookScript();
  },
  unmounted() {
    this.removeGoogleScript();
    this.removeFacebookScript();
  },
  methods: {
    addGoogleScript() {
      this.googleScript = document.createElement('script');
      this.googleScript.src = 'https://accounts.google.com/gsi/client';
      this.googleScript.async = true;
      document.head.append(this.googleScript);
    },
    removeGoogleScript() {
      this.googleScript.remove();
      // eslint-disable-next-line no-unused-expressions
      document.getElementById('googleidentityservice_button_styles')?.remove();
      // eslint-disable-next-line no-unused-expressions
      document.getElementById('googleidentityservice')?.remove();
      // eslint-disable-next-line no-unused-expressions
      document.getElementById('g_a11y_announcement')?.remove();
      delete window.google;
    },
    addFacebookScript() {
      this.facebookScript = document.createElement('script');
      this.facebookScript.src = 'https://connect.facebook.net/en_US/sdk.js';
      this.facebookScript.async = true;
      document.head.append(this.facebookScript);
    },
    removeFacebookScript() {
      this.facebookScript.remove();
      // eslint-disable-next-line no-unused-expressions
      document.querySelector('script[src^="https://connect.facebook.net"]')?.remove();
      // eslint-disable-next-line no-unused-expressions
      document.querySelector('style[data-fbcssmodules]')?.remove();
      // eslint-disable-next-line no-unused-expressions
      document.getElementById('fb-root')?.remove();
      delete window.FB;
    },
  },
};
</script>
