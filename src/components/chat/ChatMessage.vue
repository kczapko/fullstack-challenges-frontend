<template lang="pug">
li.chat-window__message.chat-window__message--day(v-if="message.type && message.type === 'DAY_SEPARATOR'")
  time.chat-window__message-day.text-gray(:datetime="message.datetime")
    span {{ message.message }}
li.chat-window__message(v-else)
  .chat-window__message-head
    base-user-image.chat-window__message-userimage(:user="{ name: message.user.username, photo: message.user.photo }")
    p.chat-window__message-username.text-gray.font-700 {{ message.user.username }}
    time.chat-window__message-time.text-gray(:datetime="formattedDateTime") {{ forrmatedDate }}
  .chat-window__message-body {{ message.message }}
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
  },
};
</script>
