<template lang="pug">
base-modal.base-modal--add-photo(modal-title="Add new photo" ref="modal")
  template(#default="{ close }")
    .form.form--add-photo
      p.form__error(v-if="error") {{ error }}
      vee-form.form__form(:validation-schema="schema" @submit="submit" ref="form")
        .form__row
          base-input(name="label" label="Label" placeholder="Caption your photo")
        .form__row
          base-input(name="imageUrl" label="Photo URL" placeholder="Link to your photo")
        .form__row.form__row--submit
          base-button(type="button" variant="link" @click="close") Cancel
          base-button(type="submit" color="primary" :disabled="submitting") Add photo
</template>

<script>
import { mapActions } from 'vuex';

import api from '@/api';
import Message from '@/utils/Message';

export default {
  name: 'AddPhotoModal',
  emits: ['add-photo'],
  setup() {
    const schema = {
      label: 'required|max:200',
      imageUrl: { required: true, photoUrl: /^(http|https):\/\/.*(\.jpg|\.png|\.webp)$/ },
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
      this.$refs.form.resetForm();
    },
    async submit(values) {
      this.submitting = true;
      this.error = '';

      try {
        const res = await api.unsplash.addPhoto(values);
        this.$refs.modal.close();
        this.$emit('add-photo', res.data.data.addUnsplashImage);
        this.addMessage(new Message('Added new photo'));
      } catch (err) {
        this.error = err;
      }

      this.submitting = false;
    },
  },
};
</script>
