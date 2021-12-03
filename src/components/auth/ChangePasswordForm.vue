<template lang="pug">
.form.form--signup
  h1.form__header.font-600 Set your new password
  p.form__error(v-if="error") {{ error }}
  vee-form.form__form(:validation-schema="schema" :initial-values="initialVaues" @submit="submit")
    .form__row
      base-input(name="token" icon="tag" placeholder="Token")
    .form__row
      base-input(name="password" type="password" icon="lock" placeholder="Password")
    .form__row
      base-input(name="passwordConfirm" type="password" icon="lock" placeholder="Confirm Password")
    .form__row.form__row--submit
      base-button.font-600(type="submit" color="primary" :disabled="submitting") Change password
  p.form__text.text-gray.text-center
    router-link(:to="{name: 'login'}") Back to Login
</template>

<script>
import { mapActions } from 'vuex';
import { useRoute } from 'vue-router';

import api from '@/api';
import Message from '@/utils/Message';

export default {
  name: 'ChangePasswordForm',
  setup() {
    const route = useRoute();
    const schema = {
      token: 'required|min:64|max:64',
      password: 'required|alpha_num|min:8|max:32',
      passwordConfirm: 'passwords_mismatch:@password',
    };
    const initialVaues = {
      token: route.query.token,
    };

    return {
      schema,
      initialVaues,
    };
  },
  data() {
    return {
      error: '',
      submitting: false,
    };
  },
  methods: {
    ...mapActions(['addMessage']),
    async submit(values) {
      this.error = '';
      this.submitting = true;

      try {
        const res = await api.auth.changePassword(values);
        if (res.data.data.changePassword) {
          this.addMessage(new Message('Password changed.'));
          await this.$router.push({ name: 'login' });
          this.addMessage(new Message('You can now login with your new password.'));
        } else {
          this.error = 'Unexpected error';
        }
      } catch (err) {
        this.error = err.message;
      }

      this.submitting = false;
    },
  },
};
</script>
