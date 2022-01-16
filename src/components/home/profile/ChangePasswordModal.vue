<template lang="pug">
base-modal.base-modal--change-password(modal-title="Change password" ref="modal")
  .form.form--change-password
    p.form__error(v-if="error") {{ error }}
    vee-form.form__form(:validation-schema="schema" @submit="submit" ref="form")
      .form__row
        base-input(name="currentPassword" type="password" icon="lock" label="Current Password" placeholder="Enter your current password...")
      .form__row
        base-input(name="password" type="password" icon="lock" label="New Password" placeholder="Enter new password...")
      .form__row
        base-input(name="passwordConfirm" type="password" icon="lock" label="Confirm New Password" placeholder="Confirm new password...")
      .form__row.form__row--submit
        base-button(type="submit" color="primary" :disabled="submitting") Change password
</template>

<script>
import { mapActions } from 'vuex';

import api from '@/api';
import Message from '@/utils/Message';

export default {
  name: 'ChangePasswordModal',
  setup() {
    const schema = {
      currentPassword: 'required|max:32',
      password: 'required|min:8|max:32',
      passwordConfirm: 'passwords_mismatch:@password',
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
        const res = await api.account.changeMyPassword(values);

        if (res.data.data.changeMyPassword) {
          this.addMessage(new Message('Password changed.'));
          this.$refs.form.resetForm();
          this.$refs.modal.close();
          this.$logoutUser();
          this.addMessage(new Message('Please login with your new password.'));
        } else {
          this.addMessage(new Message('Unexpected error while setting new password.', 'error'));
        }
      } catch (err) {
        this.error = err.message;
      }

      this.submitting = false;
    },
  },
};
</script>
