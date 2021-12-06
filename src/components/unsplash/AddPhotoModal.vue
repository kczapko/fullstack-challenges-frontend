<template lang="pug">
base-modal.base-modal--add-photo(modal-title="Add new photo" ref="modal")
  template(#default="{ close }")
    .form.form--add-photo
      p.form__error(v-if="error") {{ error }}
      vee-form.form__form(:validation-schema="schema" @submit="submit" ref="form")
        .form__row
          base-input(name="label" label="Label" placeholder="Caption your photo")
        .form__row
          base-input(name="url" label="Photo URL" placeholder="Link to your photo")
        .form__row.form__row--submit
          base-button(type="button" variant="link" @click="close") Cancel
          base-button(type="submit" color="primary" :disabled="submitting") Add photo
</template>

<script>
export default {
  name: 'AddPhotoModal',
  setup() {
    const schema = {
      label: 'required|max:200',
      url: { required: true, photoUrl: /^(http|https):\/\/.*(\.jpg|\.png|\.webp)$/ },
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
    open() {
      this.$refs.modal.open();
      this.$refs.form.resetForm();
    },
    submit(values) {
      console.log(values);
    },
  },
};
</script>
