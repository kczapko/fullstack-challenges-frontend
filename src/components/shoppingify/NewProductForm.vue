<template lang="pug">
section.new-product(:class="{ 'new-product--open' : isOpen }")
  .form.form--new-product
    h2.form__header Add new product
    vee-form.form__form(:validation-schema="schema" @submit="submit")
      .form__row
        base-input(name="name" label="Name" placeholder="Enter a name")
      .form__row
        base-input(name="note" tag="textarea" label="Note (optional)" placeholder="Enter a note")
      .form__row
        base-input(name="imageUrl" label="Image (optional)" placeholder="Enter a url")
      .form__row.form__row--category
        base-input(name="category" label="Category" placeholder="Enter a category")
        base-button(icon="close" circle title="Remove selected category")
        .form__suggestions
          ul.form__suggestions-list
            li.form__suggestions-list-item
              a.form__suggestions-link(href="#") Fruit and vegetables
            li.form__suggestions-list-item
              a.form__suggestions-link(href="#") Meat and Fish Meat and Fish Meat and Fish
            li.form__suggestions-list-item
              a.form__suggestions-link.form__suggestions-link--active(href="#") BeveragesBeveragesBeveragesBeverages
            li.form__suggestions-list-item
              a.form__suggestions-link(href="#") Beverages
            li.form__suggestions-list-item
              a.form__suggestions-link(href="#") Beverages
      p.form__error(v-if="error") {{ error }}
      .form__row.form__row--submit
        base-button(type="button" @click="close") Cancel
        base-button(type="submit" color="primary" :disabled="submitting") Save
</template>

<script>
export default {
  name: 'NewProductForm',
  setup() {
    const schema = {};

    return { schema };
  },
  data() {
    return {
      isOpen: false,
      submitting: false,
      error: '',
    };
  },
  methods: {
    submit() {},
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
  },
};
</script>
