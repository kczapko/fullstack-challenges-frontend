<template lang="pug">
ul.logo-list
  li.logo-list__item
    a.logo-list__link.logo-list__link--google(href="#" @click.prevent title="Signin with Google")
      .logo-list__button.logo-list__button--google
      svg-logo-google.logo-list__logo.logo-list__logo--google
  li.logo-list__item
    a.logo-list__link.logo-list__link--facebook(href="#" @click.prevent)
      svg-logo-facebook.logo-list__logo.logo-list__logo--facebook
  li.logo-list__item
    a.logo-list__link.logo-list__link--twitter(href="#" @click.prevent)
      svg-logo-twitter.logo-list__logo.logo-list__logo--twitter
  li.logo-list__item
    a.logo-list__link.logo-list__link--github(href="#" @click.prevent)
      svg-logo-github.logo-list__logo.logo-list__logo--github
</template>

<script>
import { mapActions } from 'vuex';

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
  mounted() {
    this.initializeGoogleButton();
  },
  methods: {
    ...mapActions('auth', ['signinWithGoogle']),
    initializeGoogleButton() {
      if (!window.google) return setTimeout(this.initializeGoogleButton, 100);

      const handleCredentialResponse = async (response) => {
        await this.signinWithGoogle(response.credential);
        this.$router.push({ name: 'home' });
      };

      window.google.accounts.id.initialize({
        client_id: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT,
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(document.querySelector('.logo-list__button--google'), {
        theme: 'outline',
        size: 'large',
      });

      return true;
    },
  },
};
</script>
