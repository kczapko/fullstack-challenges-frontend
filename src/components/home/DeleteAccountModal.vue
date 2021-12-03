<template lang="pug">
base-modal.base-modal--delete-account(modal-title="Delete account" ref="modal")
  .form.form--delete-account
    .form__head
      p.form__text.font-700.text-danger Please confirm account deletion!
      p.form__text.text-danger All your info and data from all services will be deleted.
    p.form__error(v-if="error") {{ error }}
    vee-form.form__form(:validation-schema="schema" @submit="submit")
      .form__row
        base-input(name="password" type="password" id="deletePassword" icon="lock" label="Password" placeholder="Enter password...")
      .form__row.form__row--submit
        base-button(type="submit" color="danger" :disabled="submitting") Delete account
</template>

<script>
import { mapActions } from 'vuex';

import api from '@/api';
import Message from '@/utils/Message';

export default {
  name: 'DeleteAccountModal',
  setup() {
    const schema = {
      password: 'required|max:32',
    };

    return {
      schema,
    };
  },
  data() {
    return {
      submitting: false,
      error: '',
    };
  },
  methods: {
    ...mapActions(['addMessage']),
    open() {
      this.$refs.modal.open();
    },
    async submit(values) {
      this.error = '';
      this.submitting = true;

      try {
        const res = await api.account.deleteMyAccount(values);

        if (res.data.data.deleteMyAccount) {
          this.$refs.modal.close();
          this.$logoutUser();
          this.addMessage(new Message('Your account and all your data was succesfully removed.'));
        } else {
          this.addMessage(new Message('Unexpected error during account deletion.', 'error'));
        }
      } catch (err) {
        this.error = err.message;
      }

      this.submitting = false;
    },
  },
};
</script>
