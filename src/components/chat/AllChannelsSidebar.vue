<template lang="pug">
section.all-channels
  .all-channels__header
    h2.all-channels channels
    base-button.all-channels__add-channel(icon="add" @click="$refs.modal.open()")
    base-modal.all-channels__modal(modal-title="New Channel" ref="modal")
      .all-channels__search.form.form--new-channel
        p.form__error(v-if="error" :title="error") {{ error }}
        vee-form.form__form(:validation-schema="schema" @submit="submit")
          .form__row
            base-input(name="name" placeholder="Channel name")
          .form__row
            base-input(tag="textarea" name="description" placeholder="Channel description")
          .form__row.form__row--submit
            base-button(type="submit" color="primary" :disabled="submitting") Save
  .all-channels__body
    .all-channels__search.form.form--search
      vee-form.form__form(@submit="search" v-slot="{ values }")
        .form__row
          base-input(name="search" icon="search" placeholder="Search" @input="searchQuery = values.search.trim()")
    ul.all-channels__channels
      li.all-channels__channel
        base-user-image.current-channel__image(:user="{ name: 'aaa aaa' }")
        p.current-channel__name AAA AAA
      li.all-channels__channel
        base-user-image.current-channel__image(:user="{ name: 'aaa aaa' }")
        p.current-channel__name AAA AAA
      li.all-channels__channel
        base-user-image.current-channel__image(:user="{ name: 'aaa aaa' }")
        p.current-channel__name AAA AAA
</template>

<script>
export default {
  name: 'AllChannelsSidebar',
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    search() {},
  },
};
</script>
