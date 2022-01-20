<template lang="pug">
span.ws-connection-status(v-if="clientConnectionStatus" :class="wsConnectionClass" :title="status")
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'WsClientConnectionStatus',
  computed: {
    ...mapState('chat', ['clientConnectionStatus']),
    wsConnectionClass() {
      return this.clientConnectionStatus
        ? `ws-connection-status--${this.clientConnectionStatus}`
        : '';
    },
    status() {
      switch (this.clientConnectionStatus) {
        case 'closed':
          return 'Disconnected';
        case 'connecting':
          return 'Connecting';
        case 'connected':
          return 'Connected';
        default:
          return null;
      }
    },
  },
};
</script>
