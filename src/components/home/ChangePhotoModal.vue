<template lang="pug">
base-modal.base-modal--change-photo(:modal-title="`${photo ? 'Change' : 'Add'} my photo`" ref="modal")
  .form.form--change-image
    .form__head
      p.form__text Only .jpg, .png and .webp files are allowed. Maximum 1MB file size.
    base-file-upload(url="/files/user-photo")
    p.form__error(v-if="error") {{ error }}
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
      imageUrl: { photoUrl: /^(http|https):\/\/.*(\.jpg|\.png|\.webp)$/ },
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
