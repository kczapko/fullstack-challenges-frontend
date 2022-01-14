<template lang="pug">
.chat-window
  header.chat-window__header
    base-button.chat-window__open-sidebar(icon="menu" @click="openSidebar" title="Open Menu")
    h1.chat-window__channel-name(v-if="activeChannel") {{ activeChannel.name }}
  .chat-window__body
    p.chat-window__no-channels.font-700(v-if="channels.length === 0")
      span No channels here yet!
      base-button(color="primary" @click="openNewChannelModal") Create a one
    ul.chat-window__messages(v-if="messages.length")
      chat-message(v-for="message in messages" :key="message._id" :message="message")
    .chat-window__form.form
      vee-form.form__form(:validation-schema="schema" @submit="submit" ref="form")
        .form__row
          base-input(name="message" placeholder="Type a message here" :validateOnBlur="false" :validateOnChange="false")
        .form__row.form__row--submit
          base-button(type="submit" color="primary" :disabled="submitting || !activeChannel" icon="send")
</template>

<script>
import { mapActions, mapState } from 'vuex';

import ChatMessage from '@/components/chat/ChatMessage.vue';

import Message from '@/utils/Message';

export default {
  name: 'ChatWindow',
  components: {
    ChatMessage,
  },
  inject: ['openSidebar', 'openNewChannelModal'],
  data() {
    return {
      submitting: false,
    };
  },
  setup() {
    const schema = {
      message: 'required|max:5000',
    };

    return { schema };
  },
  computed: {
    ...mapState('chat', ['channels', 'activeChannel', 'messages']),
  },
  methods: {
    ...mapActions('chat', ['addChatMessage']),
    ...mapActions(['addMessage']),
    async submit(values) {
      this.submitting = true;

      try {
        await this.addChatMessage(values);
        this.addMessage(new Message('New message added.'));
        this.$refs.form.resetForm();
      } catch (err) {
        this.addMessage(new Message(err.message, 'error'));
      }

      this.submitting = false;
    },
  },
};
</script>
