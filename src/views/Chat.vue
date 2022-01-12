<template lang="pug">
svg-page-loader(v-if="!pageLoaded")
.chat(v-if="pageLoaded")
  main.chat__main
    chat-window
  aside.chat__sidebar(:class="{ 'chat__sidebar--open': sidebarOpen, 'chat__sidebar--channel': currentChatSidebarOpen }")
    base-button.chat__sidebar-close(icon="close" @click="closeSidebar" title="Close Sidebar")
    all-channels-sidebar
    current-channel-sidebar
    base-header.chat__sidebar-header
</template>

<script>
import { useStore } from 'vuex';
import { ref, onUnmounted } from 'vue';

import useBodyClass from '@/hooks/useBodyClass';

import chatStore from '@/store/modules/chat';

import SvgPageLoader from '@/components/svg/PageLoader.vue';
import ChatWindow from '@/components/chat/ChatWindow.vue';
import AllChannelsSidebar from '@/components/chat/AllChannelsSidebar.vue';
import CurrentChannelSidebar from '@/components/chat/CurrentChannelSidebar.vue';

import '@/assets/scss/modules/chat/main.scss';

export default {
  name: 'Chat',
  components: {
    SvgPageLoader,
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

    const store = useStore();
    store.registerModule('chat', chatStore);

    onUnmounted(() => {
      store.unregisterModule('chat');
    });

    const pageLoaded = ref(false);

    store.dispatch('chat/getChannels').then(() => {
      pageLoaded.value = true;
    });

    return { pageLoaded };
  },
  data() {
    return {
      sidebarOpen: false,
      currentChatSidebarOpen: false,
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
