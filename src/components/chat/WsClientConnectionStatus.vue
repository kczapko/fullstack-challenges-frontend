<template lang="pug">
span.ws-connection-status(v-if="clientConntionStatus" :class="wsConnectionClass" :title="status")
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'WsClientConnectionStatus',
  computed: {
    ...mapState('chat', ['clientConntionStatus']),
    wsConnectionClass() {
      return this.clientConntionStatus ? `ws-connection-status--${this.clientConntionStatus}` : '';
    },
    status() {
      switch (this.clientConntionStatus) {
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
