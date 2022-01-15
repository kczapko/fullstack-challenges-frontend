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
    ul.chat-window__messages(v-if="parsedMessages.length" ref="messagesList")
        li.chat-window__load-more(v-if="messages.length < total")
          base-button(color="primary" size="small" @click="getChannelMessages") Load previous messages
        chat-message(v-for="message in parsedMessages" :key="message._id" :message="message")
        li.chat-window__messages-observer(ref="messagesObserver")
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
  setup() {
    const schema = {
      message: 'required|max:2000',
    };
    const observer = null;

    return { schema, observer };
  },
  data() {
    return {
      submitting: false,
      atBottom: false,
      savedListHeight: 0,
    };
  },
  computed: {
    ...mapState('chat', ['channels', 'activeChannel', 'messages', 'total']),
    ...mapState(['pageVisible']),
    parsedMessages() {
      const messages = [];

      if (this.messages.length) {
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
  watch: {
    'messages.length': {
      handler(val, oldVal) {
        if (oldVal === 0) {
          // initial messages load, first message
          this.observer.observe(this.$refs.messagesObserver);
          this.scrollMessageList('bottom');
          this.savedListHeight = this.$refs.messagesList.scrollHeight;
        } else if (val > oldVal) {
          if (val - oldVal === 1) {
            if (this.atBottom && this.pageVisible === 'visible') {
              // new message
              this.scrollMessageList('bottom');
              this.savedListHeight = this.$refs.messagesList.scrollHeight;
            }
          } else {
            // loading more messages
            this.scrollMessageList(this.$refs.messagesList.scrollHeight - this.savedListHeight);
            this.savedListHeight = this.$refs.messagesList.scrollHeight;
          }
        }
      },
      flush: 'post',
    },
  },
  mounted() {
    if (this.channels.length && this.channels.find((c) => c.name === 'Welcome')) {
      this.joinChannel('Welcome');
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.atBottom = true;
        } else {
          this.atBottom = false;
        }
      });
    };

    this.observer = new IntersectionObserver(observerCallback, observerOptions);
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
  methods: {
    ...mapActions('chat', ['addChatMessage', 'joinChannel', 'getChannelMessages']),
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
    scrollMessageList(amount) {
      const y = amount === 'bottom' ? this.$refs.messagesList.scrollHeight : amount;
      this.$refs.messagesList.scrollTo(0, y);
    },
  },
};
</script>
