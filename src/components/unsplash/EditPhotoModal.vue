<template lang="pug">
base-modal.base-modal--edit-photo(modal-title="Edit photo" ref="modal")
  template(#default="{ close }")
    p.form__error(v-if="error") {{ error }}
    .form.form--edit-photo
      vee-form.form__form(:validation-schema="schema" @submit="submit" ref="form")
        .form__row
          base-input(name="label" label="Label" placeholder="Caption your photo")
        .form__row.form__row--submit
          base-button(type="button" variant="link" @click="close") Cancel
          base-button(type="submit" color="primary" :disabled="submitting") Update photo
</template>

<script>
import { mapActions } from 'vuex';

import api from '@/api';
import Message from '@/utils/Message';

export default {
  name: 'EditPhotoModal',
  emits: ['edit-photo'],
  setup() {
    const schema = {
      label: 'required|max:200',
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
    open(photo) {
      this.error = '';
      // eslint-disable-next-line no-underscore-dangle
      this.id = photo._id;
      this.$refs.modal.open();
      this.$refs.form.setValues({ label: photo.label });
    },
    async submit(values) {
      this.submitting = true;
      this.error = '';

      try {
        const res = await api.unsplash.editPhoto({ ...values, id: this.id });
        this.$refs.modal.close();
        this.$emit('edit-photo', res.data.data.editMyUnsplashImage);
        this.addMessage(new Message('Photo updated successfully'));
      } catch (err) {
        this.error = err;
      }

      this.submitting = false;
    },
  },
};
</script>
