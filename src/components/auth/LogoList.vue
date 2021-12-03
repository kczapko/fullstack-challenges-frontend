<template lang="pug">
ul.logo-list
  li.logo-list__item
    a.logo-list__link.logo-list__link--google(href="#" @click.prevent title="Signin with Google")
      .logo-list__button.logo-list__button--google
      svg-logo-google.logo-list__logo.logo-list__logo--google
  li.logo-list__item
    a.logo-list__link.logo-list__link--facebook(href="#" @click.prevent="handleFacebookLogin" title="Signin with Facebook")
      svg-logo-facebook.logo-list__logo.logo-list__logo--facebook
  li.logo-list__item
    a.logo-list__link.logo-list__link--twitter(href="#" @click.prevent="handleTwitterLogin" title="Signin with Twitter")
      svg-logo-twitter.logo-list__logo.logo-list__logo--twitter
  li.logo-list__item
    a.logo-list__link.logo-list__link--github(href="#" @click.prevent="handleGithubLogin" title="Signin with Github")
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
  emits: ['auth-error'],
  data() {
    return {};
  },
  mounted() {
    this.initializeGoogleButton();
    this.initializeFacebook();
  },
  methods: {
    ...mapActions('auth', [
      'signinWithGoogle',
      'signinWithFacebook',
      'authWithTwitter',
      'authWithGithub',
    ]),
    initializeGoogleButton() {
      if (!window.google) return setTimeout(this.initializeGoogleButton, 100);

      const handleCredentialResponse = async (response) => {
        try {
          await this.signinWithGoogle(response.credential);
          this.$router.push({ name: 'dashboard' });
        } catch (e) {
          this.$emit('auth-error', e);
        }
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
    initializeFacebook() {
      if (!window.FB) return setTimeout(this.initializeFacebook, 100);

      window.FB.init({
        appId: process.env.VUE_APP_FACEBOOK_APP_ID,
        version: 'v12.0',
      });

      return true;
    },
    handleFacebookLogin() {
      window.FB.login(
        (response) => {
          if (response.status === 'connected' && response.authResponse?.accessToken) {
            this.signinWithFacebook({
              token: response.authResponse.accessToken,
              userId: response.authResponse.userID,
            })
              .then(() => {
                this.$router.push({ name: 'dashboard' });
              })
              .catch((err) => {
                this.$emit('auth-error', err);
              });
          } else {
            this.$emit('auth-error', new Error('Facebook response error.'));
          }
        },
        { scope: 'public_profile,email', return_scopes: true },
      );
    },
    async handleTwitterLogin() {
      try {
        await this.authWithTwitter();
      } catch (e) {
        this.$emit('auth-error', e);
      }
    },
    async handleGithubLogin() {
      try {
        await this.authWithGithub();
      } catch (e) {
        this.$emit('auth-error', e);
      }
    },
  },
};
</script>
