<template lang="pug">
base-modal.base-modal--change-email(modal-title="Change e-mail" ref="modal")
  .form.form--change-email
    p.form__error(v-if="error") {{ error }}
    vee-form.form__form(:validation-schema="emailSchema" @submit="changeMyEmail" ref="changeEmailForm")
      .form__row
        base-input(name="email" type="email" icon="email" label="E-mail" placeholder="New E-mail")
      .form__row.form__row--submit
        base-button(type="submit" color="primary" :disabled="submitting") Change e-mail
    vee-form.form__form(:validation-schema="tokenSchema" @submit="confirmChangeMyEmail" ref="confirmChangeEmailForm")
      .form__row
        base-input(name="oldEmailToken" icon="tag" label="Token from current e-mail" placeholder="Current E-mail Token")
      .form__row
        base-input(name="newEmailtoken" icon="tag" label="Token from new e-mail" placeholder="New E-mail Token")
      .form__row.form__row--submit
        base-button(type="submit" color="primary" :disabled="submitting") Confirm change e-mail
</template>

<script>
export default {
  name: 'ChangeEmailModal',
  setup() {
    const emailSchema = {
      email: 'required|email|max:100',
    };

    const tokenSchema = {
      oldEmailToken: 'required|min:64|max:64',
      newEmailtoken: 'required|min:64|max:64',
    };

    return {
      emailSchema,
      tokenSchema,
    };
  },
  data() {
    return {
      submitting: false,
      error: '',
    };
  },
  methods: {
    open() {
      this.$refs.modal.open();
    },
    changeMyEmail() {},
    confirmChangeMyEmail() {},
  },
};
</script>
