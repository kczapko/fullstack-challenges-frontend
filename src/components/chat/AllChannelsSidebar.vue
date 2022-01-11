<template lang="pug">
section.all-channels
  .all-channels__header
    h2.all-channels__header-title Channels
    base-button.all-channels__add-channel(icon="add" @click="openModal" title="Add Channel")
    base-modal.all-channels__modal.base-modal--new-channel(modal-title="New Channel" ref="modal")
      .all-channels__new-channel.form.form--new-channel
        p.form__error(v-if="error") {{ error }}
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
        .all-channels__channel-image
          base-svg-icon.all-channels__channel-img(text="Frontend developers")
        p.all-channels__channel-name.font-700 Frontend developers
      li.all-channels__channel
        .all-channels__channel-image
          base-svg-icon.all-channels__channel-img(text="aaaaaa")
        p.all-channels__channel-name.font-700 AAAAAA
      li.all-channels__channel
        .all-channels__channel-image
          base-svg-icon.all-channels__channel-img(text="aaa aaa")
        p.all-channels__channel-name.font-700 AAA AAA
</template>

<script>
export default {
  name: 'AllChannelsSidebar',
  data() {
    return {
      searchQuery: '',
      submitting: false,
      error: '',
    };
  },
  setup() {
    const schema = {};

    return { schema };
  },
  methods: {
    search() {},
    submit(values) {
      console.log(values);
    },
    openModal() {
      this.$refs.modal.open();
    },
  },
};
</script>
