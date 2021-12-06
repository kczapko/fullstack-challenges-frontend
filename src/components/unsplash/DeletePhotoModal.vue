<template lang="pug">
base-modal.base-modal--delete-photo(modal-title="Are you sure?" ref="modal")
  template(#default="{ close }")
    .form.form--delete-photo
      p.form__error(v-if="error") {{ error }}
      vee-form.form__form(:validation-schema="schema" @submit="submit" ref="form")
        .form__row
          base-input(name="password" label="Password" placeholder="Password")
        .form__row.form__row--submit
          base-button(type="button" variant="link" @click="close") Cancel
          base-button(type="submit" color="danger" :disabled="submitting") Delete
</template>

<script>
export default {
  name: 'DeletePhotoModal',
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
