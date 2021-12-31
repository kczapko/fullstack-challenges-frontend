<template lang="pug">
section.new-product(:class="{ 'new-product--open' : isOpen }")
  .form.form--new-product
    h2.form__header Add new product
    vee-form.form__form(:validation-schema="schema" @submit="submit" ref="form")
      .form__row
        base-input(name="name" label="Name" placeholder="Enter a name")
      .form__row
        base-input(name="note" tag="textarea" label="Note (optional)" placeholder="Enter a note")
      .form__row
        base-input(name="imageUrl" label="Image (optional)" placeholder="Enter a url")
      .form__row.form__row--category
        base-input(name="category" label="Category" placeholder="Enter a category")
        base-button(
          icon="close"
          circle
          title="Remove category selection"
          v-if="selectedCategory"
          @click="removeSelectedCategory")
        .form__suggestions(v-if="categories.length")
          ul.form__suggestions-list
            li.form__suggestions-list-item(v-for="category in categories" :key="category._id")
              a.form__suggestions-link(
                href="#"
                :class="{ 'form__suggestions-link--active' : selectedCategory && selectedCategory.name === category.name }"
                @click="selectCategory(category)"
              ) {{ category.name }}
      p.form__error(v-if="error") {{ error }}
      .form__row.form__row--submit
        base-button(type="button" @click="close") Cancel
        base-button(type="submit" color="primary" :disabled="submitting") Save
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Message from '@/utils/Message';

export default {
  name: 'NewProductForm',
  setup() {
    const schema = {
      name: 'required|max:100',
      note: 'max:500',
      imageUrl: { photoUrl: /^(http|https):\/\// },
      category: 'required|max:100',
    };

    return { schema };
  },
  data() {
    return {
      isOpen: false,
      submitting: false,
      error: '',
      selectedCategory: null,
    };
  },
  computed: {
    ...mapState('shoppingify', ['categories']),
  },
  methods: {
    ...mapActions('shoppingify', ['addMyProduct']),
    ...mapActions(['addMessage']),
    async submit(values) {
      this.error = '';
      this.submitting = true;

      try {
        await this.addMyProduct(values);
        this.close();
        this.addMessage(new Message('New product added.'));
      } catch (err) {
        this.error = err.message;
      }

      this.submitting = false;
    },
    open() {
      this.$refs.form.resetForm();
      this.selectedCategory = null;
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.$refs.form.setFieldValue('category', category.name);
    },
    removeSelectedCategory() {
      this.selectedCategory = null;
      this.$refs.form.setFieldValue('category', '');
    },
  },
};
</script>
