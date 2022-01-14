<template lang="pug">
li.chat-window__message
  .chat-window__message-head
    base-user-image.chat-window__message-userimage(:user="{ name: message.user.username, photo: message.user.photo }")
    p.chat-window__message-username.text-gray.font-700 {{ message.user.username }}
    time.chat-window__message-time.text-gray(datetime="2011-11-18T14:54:39.929") {{ forrmatedDate }}
  .chat-window__message-body {{ message.message }}
//- li.chat-window__message.chat-window__message--day
//-   time.chat-window__message-day.text-gray(datetime="2011-11-28")
//-     span August 3, 2020
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
      console.log(this);
      const date = DateTime.fromMillis(Number(this.message.createdAt)).setLocale('en-GB');
      const relative = date.toRelativeCalendar();
      if (['today', 'yesterday'].includes(relative)) {
        return `${relative} at ${date.toLocaleString(DateTime.TIME_24_SIMPLE)}`;
      }
      return date.toLocaleString(DateTime.DATETIME_SHORT);
    },
  },
};
</script>
