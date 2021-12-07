<template lang="pug">
base-modal.base-modal--delete-photo(modal-title="Are you sure?" ref="modal")
  template(#default="{ close }")
    .form.form--delete-photo
      p.form__error(v-if="error") {{ error }}
      vee-form.form__form(:validation-schema="schema" @submit="submit" ref="form")
        .form__row
          base-input(name="password" type="password" label="Password" placeholder="Password")
        .form__row.form__row--submit
          base-button(type="button" variant="link" @click="close") Cancel
          base-button(type="submit" color="danger" :disabled="submitting") Delete
</template>

<script>
import { mapActions } from 'vuex';

import api from '@/api';
import Message from '@/utils/Message';

export default {
  name: 'DeletePhotoModal',
  emits: ['delete-photo'],
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
      id: null,
    };
  },
  methods: {
    ...mapActions(['addMessage']),
    open(id) {
      this.error = '';
      this.id = id;
      this.$refs.modal.open();
      this.$refs.form.resetForm();
    },
    async submit(values) {
      this.submitting = true;
      this.error = '';

      try {
        const res = await api.unsplash.deletePhoto({ ...values, id: this.id });
        this.$refs.modal.close();
        this.$emit('delete-photo', res.data.data.deleteMyUnsplashImage);
        this.addMessage(new Message('Photo deleted successfully'));
      } catch (err) {
        this.error = err;
      }

      this.submitting = false;
    },
  },
};
</script>
