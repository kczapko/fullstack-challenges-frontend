<template lang="pug">
span.ws-connection-status(v-if="clientConntionStatus" :class="wsConnectionClass")
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
  },
};
</script>
