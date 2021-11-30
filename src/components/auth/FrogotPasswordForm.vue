<template lang="pug">
.form.form--forgot-password
  h1.form__header.font-600 Forgot password?
  p.form__error(v-if="error") {{ error }}
  vee-form.form__form(:validation-schema="schema" @submit="submit")
    .form__row
      base-input(name="email" type="email" icon="email" placeholder="E-mail")
    .form__row.form__row--submit
      base-button.font-600(type="submit" color="primary" :disabled="submitting") Reset Password
  p.form__text.text-gray.text-center
    router-link(:to="{name: 'login'}") Back to Login
</template>

<script>
import { mapActions } from 'vuex';

import api from '@/api';
import Message from '@/utils/Message';

export default {
  name: 'FrogotPasswordForm',
  setup() {
    const schema = {
      email: 'required|email|max:100',
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
    ...mapActions(['addMessage']),
    async submit(values) {
      this.error = '';
      this.submitting = true;

      try {
        const res = await api.auth.requestPasswordReset(values);
        if (res.data.data.requestPasswordReset) {
          this.addMessage(new Message('Details how to change password were sent to your e-mail.'));
          this.$router.push({ name: 'change-password' });
        } else {
          this.error = 'Unexpected error';
        }
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
