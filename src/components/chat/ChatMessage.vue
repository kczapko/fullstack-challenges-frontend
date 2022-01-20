<template lang="pug">
li.chat-message.chat-message--day(v-if="message.type === 'DAY_SEPARATOR'")
  time.chat-message__day.text-gray(:datetime="message.datetime")
    span {{ message.message }}
li.chat-message(v-else)
  .chat-message__head
    base-user-image.chat-message__user-image(:user="{ name: message.user.username, photo: message.user.photo }")
    p.chat-message__username.text-gray.font-700 {{ message.user.username }}
    time.chat-message__time.text-gray(:datetime="formattedDateTime") {{ forrmatedDate }}
  .chat-message__body
    .chat-message__message
      template(v-for="chunk in parsedMessage")
        span(v-if="message.type === 'message'" :data-channel="chunk.type === 'channel' ? chunk.content.slice(1) : null") {{ chunk.content }}
        img(v-if="message.type === 'image' && !imageLoadError" :src="chunk.content" alt="" @load="imageLoaded" @error="imageLoadError = true")
    template(v-if="message.meta")
      .chat-message__meta.chat-message__meta--image(v-if="message.meta.type === 'image' && !imageLoadError")
        .chat-message__image
          img.chat-message__image-img(:src="message.meta.url" alt="" @load="imageLoaded" @error="imageLoadError = true")
      .chat-message__meta.chat-message__meta--page(v-if="message.meta.type === 'page'")
        .chat-message__page(:class="{ 'chat-message__page--with-image' : message.meta.image && !imageLoadError }")
          .chat-message__page-image(v-if="message.meta.image && !imageLoadError")
            img.chat-message__page-img(:src="message.meta.image" alt="" @load="imageLoaded" @error="imageLoadError = true")
          h2.chat-message__page-title
            a.chat-message__page-url(:href="message.meta.url" rel="noopener" target="_blank") {{ message.meta.title }}
          .chat-message__page-description(v-if="message.meta.description") {{ message.meta.description }}
</template>

<script>
import { DateTime } from 'luxon';

export default {
  name: 'ChatMessage',
  props: {
    message: {
      type: Object,
      required: true,
    },
    search: {
      type: String,
      required: true,
    },
  },
  emits: ['updated'],
  data() {
    return {
      imageLoadError: false,
    };
  },
  computed: {
    forrmatedDate() {
      const date = DateTime.fromMillis(Number(this.message.createdAt)).setLocale('en-GB');
      const relative = date.toRelativeCalendar();
      if (['today', 'yesterday'].includes(relative)) {
        return `${relative} at ${date.toLocaleString(DateTime.TIME_24_SIMPLE)}`;
      }
      return date.toLocaleString(DateTime.DATETIME_SHORT);
    },
    formattedDateTime() {
      return DateTime.fromMillis(Number(this.message.createdAt)).setLocale('en-GB').toISO();
    },
    parsedMessage() {
      let chunks = [];
      let lastIndex = 0;

      const regExp = new RegExp(`${this.search}`, 'g');
      const channels = [...this.message.message.matchAll(regExp)];

      for (let i = 0; i < channels.length; i += 1) {
        chunks.push({
          type: 'text',
          content: channels[i].input.slice(lastIndex, channels[i].index),
        });
        chunks.push({
          type: 'channel',
          content: channels[i].input.slice(
            channels[i].index,
            channels[i].index + channels[i][0].length,
          ),
        });
        lastIndex = channels[i].index + channels[i][0].length;
      }

      chunks.push({
        type: 'text',
        content: this.message.message.slice(lastIndex, this.message.message.length),
      });

      if (chunks.length) {
        chunks = chunks.filter((c) => !(c.type === 'text' && !c.content));
        return chunks;
      }

      return [
        {
          type: 'text',
          content: this.message.message,
        },
      ];
    },
  },
  watch: {
    'message.meta': {
      handler() {
        this.$emit('updated', this.message);
      },
      flush: 'post',
    },
  },
  methods: {
    imageLoaded(e) {
      const img = e.target;
      img.setAttribute('height', img.naturalHeight);
      img.setAttribute('width', img.naturalWidth);
      this.$emit('updated', this.message);
    },
  },
};
</script>
