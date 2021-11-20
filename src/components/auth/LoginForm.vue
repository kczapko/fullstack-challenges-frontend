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
  logo-list
  p.form__text.text-gray.text-center Don’t have an account yet?
    |
    |
    router-link(:to="{name: 'signup'}") Register
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
    ...mapActions('auth', ['login']),
    async submit(values) {
      this.error = '';
      this.submitting = true;

      try {
        await this.login(values);
        this.$router.push({ name: 'home' });
      } catch (e) {
        // prettier-ignore
        this.error = e.response?.data?.errors[0]?.message
          || e.response?.message
          || e.message
          || 'Network problems';
      }

      this.submitting = false;
    },
  },
};
</script>

<style></style>
