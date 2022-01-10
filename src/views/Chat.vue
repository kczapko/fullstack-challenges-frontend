<template lang="pug">
.chat
  main.chat__main
    chat-window
  aside.chat__sidebar
    base-button.chat__sidebar-close(icon="close")
    all-channels-sidebar
    current-channel-sidebar
    base-header
</template>

<script>
import useBodyClass from '@/hooks/useBodyClass';

import ChatWindow from '@/components/chat/ChatWindow.vue';
import AllChannelsSidebar from '@/components/chat/AllChannelsSidebar.vue';
import CurrentChannelSidebar from '@/components/chat/CurrentChannelSidebar.vue';

export default {
  name: 'Chat',
  components: {
    ChatWindow,
    AllChannelsSidebar,
    CurrentChannelSidebar,
  },
  setup() {
    useBodyClass('module-chat');
  },
};
</script>
