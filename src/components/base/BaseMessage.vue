<template lang="pug">
.base-message
  ul.base-message__list
    transition-group(name="fade")
      li.base-message__item.font-600(
        v-for="message in messages"
        :key="message.id"
        :class="[`base-message__item--${message.type}`]") {{ message.message }}
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BaseMessage',
  computed: {
    ...mapState(['messages']),
  },
};
</script>
