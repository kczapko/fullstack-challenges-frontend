<template lang="pug">
base-modal.base-modal--change-photo(:modal-title="`${photo ? 'Change' : 'Add'} my photo`" ref="modal")
  template(#default="{ isOpen }")
    .form.form--change-image
      .form__head
        p.form__text Only .jpg, .png and .webp files are allowed. Maximum 1MB file size.
      base-file-upload(url="/files/user-photo" @upload-success="updatePhoto" v-if="isOpen")
      p.form__error(v-if="error") {{ error }}
      vee-form.form__form(:validation-schema="schema" @submit="submit" ref="form")
        .form__row
          base-input(name="imageUrl" type="url" icon="link" label="Or paste url to your photo" placeholder="Link to your photo")
        .form__row.form__row--submit
          base-button(type="submit" color="primary" :disabled="submitting") {{ photo ? 'Change' : 'Add' }} photo
</template>

<script>
import { mapActions } from 'vuex';

import Message from '@/utils/Message';

export default {
  name: 'ChangePhotoModal',
  props: {
    photo: {
      required: true,
    },
  },
  emits: ['userDataUpdated'],
  setup() {
    const schema = {
      imageUrl: { required: true, photoUrl: /^(http|https):\/\// },
    };

    return { schema };
  },
  data() {
    return {
      submitting: false,
      error: '',
    };
  },
  methods: {
    ...mapActions(['addMessage']),
    ...mapActions('account', ['changeUserPhoto', 'updateUserPhoto']),
    open() {
      this.$refs.modal.open();
    },
    async submit(values) {
      this.submitting = true;
      this.error = '';

      try {
        await this.changeUserPhoto(values);
        this.addMessage(new Message(`Your photo has been ${this.photo ? 'changed' : 'added'}.`));
        this.$emit('userDataUpdated');
        this.$refs.form.resetForm();
        this.$refs.modal.close();
      } catch (err) {
        this.error = err.message;
      }

      this.submitting = false;
    },
    updatePhoto(data) {
      this.submitting = true;
      this.$refs.modal.close();
      this.$emit('userDataUpdated');
      this.updateUserPhoto(data.file);
      this.addMessage(new Message(`Your photo has been ${this.photo ? 'changed' : 'added'}.`));
      this.submitting = false;
    },
  },
};
</script>
