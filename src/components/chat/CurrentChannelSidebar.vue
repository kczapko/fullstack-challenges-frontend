<template lang="pug">
section.current-channel
  template(v-if="activeChannel")
    .current-channel__header
      base-button.current-channel__all-channels.font-700(icon="arrow_back_ios" @click="closeCurrentChatSidebar") All channels
    .current-channel__body
      h2.current-channel__title.current-channel__title--name.font-700 {{ activeChannel.name }}
      p.current-channel__description.text-pre-line {{ activeChannel.description }}
      h2.current-channel__title.current-channel__title--members.font-700 Members
      ul.current-channel__members
        li.current-channel__member(v-for="member in activeChannel.members" :key="`${member.username}-${member.photo}`")
          base-user-image.current-channel__userimage(:user="{ name: member.username, photo: member.photo }")
          p.current-channel__username.font-700 {{ member.username }}
</template>

<script>
import { mapState } from 'vuex';

export default {
  namw: 'CurrentChannelSidebar',
  inject: ['closeCurrentChatSidebar'],
  computed: {
    ...mapState('chat', ['activeChannel']),
  },
};
</script>
