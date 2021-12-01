<template lang="pug">
base-modal.base-modal--delete-photo(modal-title="Are you sure?" footer-button="Yes, delete my photo." ref="modal")
  template(#footer="{ buttonText }")
    .form
      .p.form__error(v-if="error") {{ error }}
    base-button.base-modal__footer-button(@click="" color="danger" :disabled="submitting") {{ buttonText }}
</template>

<script>
export default {
  name: 'DeletePhotoModal',
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
  },
};
</script>
