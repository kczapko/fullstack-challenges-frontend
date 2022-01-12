<template lang="pug">
section.all-channels
  .all-channels__header
    h2.all-channels__header-title Channels
    base-button.all-channels__add-channel(icon="add" @click="openModal" title="Add Channel")
    base-modal.all-channels__modal.base-modal--new-channel(modal-title="New Channel" ref="modal")
      .all-channels__new-channel.form.form--new-channel
        p.form__error(v-if="error") {{ error }}
        vee-form.form__form(:validation-schema="schema" @submit="submit" ref="form")
          .form__row
            base-input(name="name" placeholder="Channel name")
          .form__row
            base-input(tag="textarea" name="description" placeholder="Channel description")
          .form__row.form__row--submit
            base-button(type="submit" color="primary" :disabled="submitting") Save
  .all-channels__body
    template(v-if="channels.length > 0")
      .all-channels__search.form.form--search
        vee-form.form__form(@submit="search" v-slot="{ values }")
          .form__row
            base-input(name="search" icon="search" placeholder="Search" @input="searchQuery = values.search.trim()")
      ul.all-channels__channels
        li.all-channels__channel(v-for="channel in channels" :key="channel._id")
          button.all-channels__channel-button(:title="`Join ${channel.name} Channel`" @click="changeChannel(channel.name)")
            .all-channels__channel-image
              base-svg-icon.all-channels__channel-img(:text="channel.name")
            p.all-channels__channel-name.font-700 {{ channel.name }}
    p.all-channels__no-channels(v-else) No channels here yet! Create one.
</template>

<script>
import { mapActions, mapState } from 'vuex';

import Message from '@/utils/Message';

export default {
  name: 'AllChannelsSidebar',
  setup() {
    const schema = {
      name: 'required|min:5|max:100',
      description: 'required|min:10|max:500',
    };

    return { schema };
  },
  data() {
    return {
      searchQuery: '',
      submitting: false,
      error: '',
    };
  },
  computed: {
    ...mapState('chat', ['channels']),
  },
  methods: {
    ...mapActions('chat', ['addChannel', 'joinChannel']),
    ...mapActions(['addMessage']),
    search() {},
    async submit(values) {
      this.submitting = true;
      this.error = '';

      try {
        await this.addChannel(values);
        this.addMessage(new Message('New channel added.'));
      } catch (err) {
        this.error = err.message;
      }

      this.submitting = false;
    },
    openModal() {
      this.$refs.modal.open();
    },
    changeChannel(name) {
      this.joinChannel(name);
    },
  },
};
</script>
