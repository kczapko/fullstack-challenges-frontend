<template lang="pug">
section.current-channel
  template(v-if="activeChannel")
    .current-channel__header
      base-button.current-channel__all-channels.font-700(icon="arrow_back_ios" @click="closeCurrentChatSidebar") All channels
    .current-channel__body
      .current-channel__enable-notifications(v-if="notificationsPermission === 'default'")
        base-button.current-channel__enable-notifications-button(color="primary" @click="requsetNotificationsPermission") Enable Notifications
      h2.current-channel__title.current-channel__title--name.font-700
        ws-client-connection-status
        base-button(color="primary" icon="sync" title="Reconnect" v-if="clientConntionStatus === 'closed'" @click="recconectChannel(activeChannel)")
        span {{ activeChannel.name }}
      p.current-channel__description.text-pre-line {{ activeChannel.description }}
      h2.current-channel__title.current-channel__title--members.font-700 Members
      ul.current-channel__members
        li.current-channel__member(v-for="member in activeChannel.members" :key="`${member.username}-${member.photo}`")
          base-user-image.current-channel__userimage(:user="{ name: member.username, photo: member.photo }")
          p.current-channel__username.font-700 {{ member.username }}
</template>

<script>
import { mapState, mapActions } from 'vuex';

import WsClientConnectionStatus from '@/components/chat/WsClientConnectionStatus.vue';

export default {
  namw: 'CurrentChannelSidebar',
  components: {
    WsClientConnectionStatus,
  },
  inject: ['closeCurrentChatSidebar', 'openChannelPasswordModal'],
  computed: {
    ...mapState('chat', ['activeChannel', 'clientConntionStatus']),
    ...mapState(['notificationsPermission']),
  },
  methods: {
    ...mapActions(['requsetNotificationsPermission']),
    ...mapActions('chat', ['joinChannel']),
    recconectChannel(channel) {
      // eslint-disable-next-line no-unused-expressions
      channel.isPrivate ? this.openChannelPasswordModal(channel) : this.joinChannel(channel.name);
    },
  },
};
</script>
