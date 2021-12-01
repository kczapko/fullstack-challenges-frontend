<template lang="pug">
base-modal.base-modal--change-photo(:modal-title="`${photo ? 'Change' : 'Add'} my photo`" ref="modal")
  .form.form--change-image
    .image-upload
      input.image-upload__input(type="file" name="image" accept="image/jpg,image/jpeg,image/png,image/webp")
      .image-upload__dropzone
        span.image-upload__dropzone-text.text-gray Drag and Drop Image
        span.image-upload__dropzone-text.text-gray Or
        a.image-upload__dropzone-link(href="#") Browse files
    vee-form.form__form(:validation-schema="schema" @submit="submit" ref="form")
      .form__row
        base-input(name="imageUrl" type="url" icon="link" label="Or paste url to your photo" placeholder="Link to your photo")
      .form__row.form__row--submit
        base-button(type="submit" color="primary" :disabled="submitting") {{ photo ? 'Change' : 'Add' }} photo
</template>

<script>
export default {
  name: 'ChangePhotoModal',
  props: {
    photo: {
      required: true,
    },
  },
  setup() {
    const schema = {
      imageUrl: { photoUrl: /https:\/\/.*(\.jpg|\.png|\.webp)$/ },
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
    open() {
      this.$refs.modal.open();
    },
    submit() {},
  },
};
</script>
