<template lang="pug">
.form.form--login
  h1.form__header.font-600 Login
  p.form__error(v-if="error") {{ error }}
  vee-form.form__form(:validation-schema="schema" @submit="submit")
    .form__row
      base-input(name="email" type="email" icon="email" placeholder="E-mail")
    .form__row
      base-input(name="password" type="password" icon="lock" placeholder="Password")
    .form__row.form__row--submit
      base-button.font-600(type="submit" color="primary" :disabled="submitting") Login
  p.form__text.text-gray.text-center or continue with these social profile
  logo-list(@auth-error="handleSocialAuthError")
  p.form__text.text-gray.text-center Don’t have an account yet?
    |
    |
    router-link(:to="{name: 'signup'}") Register
  p.form__text.text-gray.text-center
    router-link(:to="{name: 'forgot-password'}") Forgot password?
</template>

<script>
import { mapActions } from 'vuex';

import LogoList from '@/components/auth/LogoList.vue';

export default {
  name: 'LoginForm',
  components: {
    LogoList,
  },
  setup() {
    const schema = {
      email: 'required|email|max:100',
      password: 'required|max:32',
    };

    return {
      schema,
    };
  },
  data() {
    return {
      error: '',
      submitting: false,
    };
  },
  methods: {
    ...mapActions('auth', ['login', 'setAuthError']),
    async submit(values) {
      this.error = '';
      this.submitting = true;

      try {
        await this.login(values);
        this.$router.push({ name: 'dashboard' });
      } catch (err) {
        this.error = err.message;
      }

      this.submitting = false;
    },
    handleSocialAuthError(err) {
      // prettier-ignore
      this.error = err.response?.data?.errors[0]?.message
      || err.response?.message
      || err.message
      || 'Network problems';
    },
  },
  created() {
    const { authError } = this.$store.state.auth;

    if (authError) {
      this.handleSocialAuthError(authError);
      this.setAuthError(null);
    }
  },
};
</script>
