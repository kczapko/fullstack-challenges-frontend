<template lang="pug">
.shopping-list__footer
  .shopping-list__footer-form.form.form--save-shopping-list
    p.form__error(v-if="error") {{ error }}
    vee-form.form__form(:validation-schema="schema" @submit="submit")
      .form__row
        base-input(name="listName" placeholder="Enter a name")
      .form__row.form__row--submit
        base-button(type="submit" color="primary" :disabled="submitting") Save
  .shopping-list__footer-actions
    base-button Cancel
    base-button(color="secondary") Complete
    base-modal.shopping-list__modal.base-modal--cancel-shopping-list(modal-title="Are you sure that you want to cancel this list?" ref="modal")
      template(#default="{ close }")
        base-button(@click="close") Cancel
        base-button(color="danger") Yes
</template>

<script>
export default {
  name: 'ShoppingListFooter',
  setup() {
    const schema = {
      linstName: 'required',
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
    submit() {},
  },
};
</script>
