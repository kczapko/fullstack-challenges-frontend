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
export default {
  name: 'EditPhotoModal',
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
