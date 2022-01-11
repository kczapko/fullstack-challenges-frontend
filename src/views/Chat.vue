<template lang="pug">
.chat
  main.chat__main
    chat-window
  aside.chat__sidebar(:class="{ 'chat__sidebar--open': sidebarOpen, 'chat__sidebar--channel': true }")
    base-button.chat__sidebar-close(icon="close" @click="closeSidebar" title="Close Sidebar")
    all-channels-sidebar
    current-channel-sidebar
    base-header.chat__sidebar-header
</template>

<script>
import useBodyClass from '@/hooks/useBodyClass';

import ChatWindow from '@/components/chat/ChatWindow.vue';
import AllChannelsSidebar from '@/components/chat/AllChannelsSidebar.vue';
import CurrentChannelSidebar from '@/components/chat/CurrentChannelSidebar.vue';

import '@/assets/scss/modules/chat/main.scss';

export default {
  name: 'Chat',
  components: {
    ChatWindow,
    AllChannelsSidebar,
    CurrentChannelSidebar,
  },
  provide() {
    return {
      openSidebar: this.openSidebar,
    };
  },
  setup() {
    useBodyClass('module-chat');
  },
  data() {
    return {
      sidebarOpen: false,
    };
  },
  methods: {
    openSidebar() {
      this.sidebarOpen = true;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    },
  },
};
</script>
