<template lang="pug">
.chat-window
  header.chat-window__header
    base-button.chat-window__open-sidebar(icon="menu" @click="openSidebar" title="Open Menu")
    h1.chat-window__channel-name(v-if="activeChannel")
      ws-client-connection-status
      span {{ activeChannel.name }}
  .chat-window__body
    p.chat-window__no-channels.font-700(v-if="channels.length === 0")
      span No channels here yet!
      base-button(color="primary" @click="openNewChannelModal") Create a one
    ul.chat-window__messages(v-if="parsedMessages.length")
      chat-message(v-for="message in parsedMessages" :key="message._id" :message="message")
    .chat-window__form.form
      vee-form.form__form(:validation-schema="schema" @submit="submit" ref="form")
        .form__row
          base-input(name="message" placeholder="Type a message here" :validateOnBlur="false" :validateOnChange="false")
        .form__row.form__row--submit
          base-button(type="submit" color="primary" :disabled="submitting || !activeChannel" icon="send")
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { DateTime } from 'luxon';

import ChatMessage from '@/components/chat/ChatMessage.vue';
import WsClientConnectionStatus from '@/components/chat/WsClientConnectionStatus.vue';

import Message from '@/utils/Message';

export default {
  name: 'ChatWindow',
  components: {
    ChatMessage,
    WsClientConnectionStatus,
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
    parsedMessages() {
      const messages = [];

      if (this.messages.length > 1) {
        for (let i = 0; i < this.messages.length; i += 1) {
          const message = this.messages[i];
          const nextMessage = this.messages[i + 1];
          const messageDate = DateTime.fromMillis(Number(message.createdAt));

          if (i === 0) {
            messages.push({
              _id: messageDate.toLocaleString(DateTime.DATE_SHORT),
              message: messageDate.toFormat('dd LLLL, yyyy'),
              datetime: messageDate.toISODate(),
              type: 'DAY_SEPARATOR',
            });
          }

          messages.push(message);

          if (nextMessage) {
            const nextMessageDate = DateTime.fromMillis(Number(nextMessage.createdAt));

            // prettier-ignore
            if (
              messageDate.toLocaleString(DateTime.DATE_SHORT)
              !== nextMessageDate.toLocaleString(DateTime.DATE_SHORT)
            ) {
              messages.push({
                _id: nextMessageDate.toLocaleString(DateTime.DATE_SHORT),
                message: nextMessageDate.toFormat('dd LLLL, yyyy'),
                datetime: nextMessageDate.toISODate(),
                type: 'DAY_SEPARATOR',
              });
            }
          }
        }
        return messages;
      }

      return this.messages;
    },
  },
  mounted() {
    if (this.channels.length && this.channels.find((c) => c.name === 'Welcome')) {
      this.joinChannel('Welcome');
    }
  },
  methods: {
    ...mapActions('chat', ['addChatMessage', 'joinChannel']),
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
