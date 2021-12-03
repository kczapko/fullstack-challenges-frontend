<template lang="pug">
.form.form--signup
  h1.form__header.font-600 Join thousands of learners from around the world
  p.form__text Master web development by making real-life projects. There are multiple paths for you to choose
  p.form__error(v-if="error") {{ error }}
  vee-form.form__form(:validation-schema="schema" @submit="submit")
    .form__row
      base-input(name="email" type="email" icon="email" placeholder="E-mail")
    .form__row
      base-input(name="password" type="password" icon="lock" placeholder="Password")
    .form__row
      base-input(name="passwordConfirm" type="password" icon="lock" placeholder="Confirm Password")
    .form__row.form__row--submit
      base-button.font-600(type="submit" color="primary" :disabled="submitting") Start coding now
  p.form__text.text-gray.text-center or continue with these social profile
  logo-list(@auth-error="handleSocialAuthError")
  p.form__text.text-gray.text-center Adready a member?
    |
    |
    router-link(:to="{name: 'login'}") Login
</template>

<script>
import { mapActions } from 'vuex';

import LogoList from '@/components/auth/LogoList.vue';

export default {
  name: 'SignupForm',
  components: {
    LogoList,
  },
  setup() {
    const schema = {
      email: 'required|email|max:100',
      password: 'required|alpha_num|min:8|max:32',
      passwordConfirm: 'passwords_mismatch:@password',
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
    ...mapActions('auth', ['signup']),
    async submit(values) {
      this.error = '';
      this.submitting = true;

      try {
        await this.signup(values);
        this.$router.push({ name: 'dashboard' });
      } catch (err) {
        this.error = err.message;
      }

      this.submitting = false;
    },
    handleSocialAuthError(err) {
      this.error = err.message;
    },
  },
};
</script>
