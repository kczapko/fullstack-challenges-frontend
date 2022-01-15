<template lang="pug">
base-modal.new-channel-modal.base-modal--new-channel(modal-title="New Channel" ref="modal")
  .new-channel-modal__form.form.form--new-channel
    p.form__error(v-if="error") {{ error }}
    vee-form.form__form(:validation-schema="schema" :initial-values="initialValues" @submit="submit" ref="form")
      .form__row
        base-input(name="name" placeholder="Channel name")
      .form__row
        base-input(tag="textarea" name="description" placeholder="Channel description")
      .form__row.form__row--checkbox
        vee-field(
          id="isPrivate"
          name="isPrivate"
          as="input"
          type="checkbox"
          :unchecked-value="false"
          :value="true")
        label(for="isPrivate") Private
      .form__row
        base-input(name="password" type="password" placeholder="Password" icon="lock")
      .form__row.form__row--submit
        base-button(type="submit" color="primary" :disabled="submitting") Save
</template>

<script>
import { mapActions } from 'vuex';

import Message from '@/utils/Message';

export default {
  name: 'NewChannelModal',
  setup() {
    const schema = {
      name: 'required|alpha_spaces|min:5|max:100',
      description: 'required|min:10|max:300',
      isPrivate: '',
      password: 'requiredConditionally:isPrivate|alpha_num|min:8|max:32',
    };

    const initialValues = {
      isPrivate: false,
    };

    return { schema, initialValues };
  },
  data() {
    return {
      submitting: false,
      error: '',
    };
  },
  methods: {
    ...mapActions('chat', ['addChannel']),
    ...mapActions(['addMessage']),
    open() {
      this.$refs.modal.open();
    },
    async submit(values) {
      this.submitting = true;
      this.error = '';

      try {
        await this.addChannel(values);
        this.addMessage(new Message('New channel added.'));
        this.$refs.form.resetForm();
        this.$refs.modal.close();
      } catch (err) {
        this.error = err.message;
      }

      this.submitting = false;
    },
  },
};
</script>
