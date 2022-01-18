<template lang="pug">
base-modal.channel-password-modal.base-modal--channel-password(:modal-title="`Enter password to join ${channel.name}`" ref="modal" v-slot="{ close }")
  .channel-password-modal__form.form.form--channel-password
    vee-form.form__form(:validation-schema="schema" @submit="submit" ref="form")
      .form__row
        base-input(name="password" type="password" autocomplete="off" placeholder="Password" icon="lock")
      .form__row.form__row--submit
        base-button(type="button" @click="close") Cancel
        base-button(type="submit" color="primary" :disabled="submitting") Submit
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ChannelPasswordModal',
  setup() {
    const schema = {
      password: 'required|max:32',
    };

    return { schema };
  },
  data() {
    return {
      submitting: false,
      channel: {},
    };
  },
  methods: {
    ...mapActions('chat', ['joinChannel']),
    open(channel) {
      this.$refs.form.resetForm();
      this.$refs.modal.open();
      this.channel = channel;
    },
    async submit(values) {
      this.submitting = true;

      this.joinChannel({ name: this.channel.name, password: values.password });
      this.$refs.modal.close();

      this.submitting = false;
    },
  },
};
</script>
