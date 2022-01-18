<template lang="pug">
.form.form--confirm-email
  h6.form__header.font-600 Activate your account
  p.form__text Copy verification token from e-mail we sent you.
  small.form__text Didn't you get an email?
    |
    |
    a(href="#" @click.prevent="requestNewToken") Request new token.
  p.form__error(v-if="error") {{ error }}
  vee-form.form__form(:validation-schema="schema" @submit="submit")
    .form__row
      base-input(name="token" autocomplete="off" icon="tag" placeholder="Token")
    .form__row.form__row--submit
      base-button(type="submit" color="primary" :disabled="submitting") Activate Account
</template>

<script>
import { mapActions } from 'vuex';

import Message from '@/utils/Message';
import api from '@/api';

export default {
  name: 'ConfirmEmailForm',
  setup() {
    const schema = {
      token: 'required|min:64|max:64',
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
    ...mapActions('account', ['confirmEmail']),
    ...mapActions(['addMessage']),
    async submit(values) {
      this.submitting = true;
      this.error = '';

      try {
        const res = await this.confirmEmail(values);
        if (res) {
          this.addMessage(
            new Message('E-mail address confirmed. You have access to all services.'),
          );
        } else {
          this.error = 'Invalid token';
        }
      } catch (e) {
        this.error = 'Unexpected problem during e-mail verification.';
      }

      this.submitting = false;
    },
    async requestNewToken() {
      this.error = '';

      try {
        await api.account.resendConfirmEmail();
        this.addMessage(new Message('E-mail with new verification token was sent to you.'));
      } catch (e) {
        this.error = 'Unexpected problem during e-mail resending.';
      }
    },
  },
};
</script>
