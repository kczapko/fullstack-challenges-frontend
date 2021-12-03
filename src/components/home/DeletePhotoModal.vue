<template lang="pug">
base-modal.base-modal--delete-photo(modal-title="Are you sure?" footer-button="Yes, delete my photo." ref="modal")
  template(#footer="{ buttonText }")
    .form
      p.form__error(v-if="error") {{ error }}
      base-button.base-modal__footer-button(@click="deleteMyPhoto" color="danger" :disabled="submitting") {{ buttonText }}
</template>

<script>
import { mapActions } from 'vuex';

import Message from '@/utils/Message';

export default {
  name: 'DeletePhotoModal',
  data() {
    return {
      submitting: false,
      error: '',
    };
  },
  methods: {
    ...mapActions(['addMessage']),
    ...mapActions('account', ['deleteUserPhoto']),
    open() {
      this.$refs.modal.open();
    },
    async deleteMyPhoto() {
      this.error = '';
      this.submitting = true;

      try {
        const res = await this.deleteUserPhoto();

        if (res) {
          this.$refs.modal.close();
          this.addMessage(new Message('Your photo was deleted.'));
          this.$emit('userDataUpdated');
        } else {
          this.addMessage(new Message('Unexpected error while deleting your photo.', 'error'));
        }
      } catch (e) {
        // prettier-ignore
        this.error = e.response?.data?.errors[0]?.message
          || e.response?.message
          || e.message
          || 'Network problems';
      }

      this.submitting = false;
    },
  },
};
</script>
