<template lang="pug">
.chat-window
  header.chat-window__header
    base-button.chat-window__open-sidebar(icon="menu" @click="openSidebar" title="Open Menu")
    h1.chat-window__channel-name(v-if="activeChannel")
      ws-client-connection-status
      span {{ activeChannel.name }}
  .chat-window__body(@click="joinChannelMaybe")
    p.chat-window__no-channels.font-700(v-if="channels.length === 0")
      span No channels here yet!
      base-button(color="primary" @click="openNewChannelModal") Create a one
    ul.chat-window__messages(v-if="parsedMessages.length" ref="messagesList")
        li.chat-window__load-more(v-if="messages.length < total")
          base-button(color="primary" size="small" @click="loadMoreMessages") Load previous messages
        chat-message.chat-window__message(
          v-for="message in parsedMessages"
          :key="message._id"
          :message="message"
          :search="search"
          @updated="messageUpdated"
        )
        li.chat-window__messages-observer(ref="messagesObserver")
    .chat-window__form.form
      vee-form.form__form(:validation-schema="schema" @submit="submit" ref="form")
        .form__row
          base-input(name="message" autocomplete="off" placeholder="Type a message here" :validateOnBlur="false" :validateOnChange="false")
        .form__row.form__row--submit
          base-button(type="submit" color="primary" :disabled="!activeChannel" icon="send" title="Send Message")
        .form__row.form__row--image
          base-button(type="button" color="secondary" @click="openModal" :disabled="!activeChannel" icon="image" title="Upload Image")
          add-chat-image-modal.chat__modal.chat-window__modal(v-if="activeChannel" ref="modal")
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { DateTime } from 'luxon';

import ChatMessage from '@/components/chat/ChatMessage.vue';
import WsClientConnectionStatus from '@/components/chat/WsClientConnectionStatus.vue';
import AddChatImageModal from '@/components/chat/AddChatImageModal.vue';

import Message from '@/utils/Message';

export default {
  name: 'ChatWindow',
  components: {
    ChatMessage,
    WsClientConnectionStatus,
    AddChatImageModal,
  },
  inject: ['openSidebar', 'openNewChannelModal'],
  setup() {
    const schema = {
      message: 'required|max:1000',
    };
    const observer = null;

    return { schema, observer };
  },
  data() {
    return {
      submitting: false,
      atBottom: false,
      savedListHeight: 0,
      loadingMore: false,
      initialLoad: false,
    };
  },
  computed: {
    ...mapState('chat', [
      'channels',
      'activeChannel',
      'messages',
      'total',
      'clientConnectionStatus',
    ]),
    ...mapState(['pageVisible']),
    parsedMessages() {
      const messages = [];

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
    },
    search() {
      return this.channels
        .map((c) => c.name)
        .sort((a, b) => b.split(' ').length - a.split(' ').length)
        .reduce((prev, current, i) => `${i === 1 ? '#' : ''}${prev}|#${current}`);
    },
  },
  watch: {
    'messages.length': {
      handler(val, oldVal) {
        if (oldVal === 0) {
          // initial messages load, first message
          this.initialLoad = true;
          this.observer.observe(this.$refs.messagesObserver);
          this.scrollMessageList('bottom');
        } else if (val > oldVal) {
          this.initialLoad = false;
          if (this.atBottom && this.pageVisible === 'visible' && !this.loadingMore) {
            // new message
            this.scrollMessageList('bottom');
          }
          if (this.loadingMore) {
            // loading more messages
            this.loadingMore = false;
            this.scrollMessageList(this.$refs.messagesList.scrollHeight - this.savedListHeight);
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
      this.saveListHeight();
    },
    saveListHeight() {
      this.savedListHeight = this.$refs.messagesList.scrollHeight;
    },
    messageUpdated(message) {
      if (this.initialLoad === true) {
        this.scrollMessageList('bottom');
        return;
      }
      if (this.messages.indexOf(message) === this.messages.length - 1) {
        if (this.atBottom && this.pageVisible === 'visible') {
          this.scrollMessageList('bottom');
        }
      }
    },
    joinChannelMaybe(e) {
      if (e.target.hasAttribute('data-channel')) {
        const channel = e.target.getAttribute('data-channel');
        if (this.activeChannel.name !== channel) this.joinChannel(channel);
      }
    },
    loadMoreMessages() {
      this.saveListHeight();
      this.loadingMore = true;
      this.getChannelMessages();
    },
    openModal() {
      if (this.clientConnectionStatus !== 'connected') {
        this.addMessage(new Message('You are not connected.', 'error'));
        return;
      }
      this.$refs.modal.open();
    },
  },
};
</script>
