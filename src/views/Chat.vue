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
  //- modals
  new-channel-modal(ref="newChannelmodal")
</template>

<script>
import { useStore, mapState } from 'vuex';
import { ref, onUnmounted } from 'vue';

import useBodyClass from '@/hooks/useBodyClass';

import chatStore from '@/store/modules/chat';

import SvgPageLoader from '@/components/svg/PageLoader.vue';
import ChatWindow from '@/components/chat/ChatWindow.vue';
import AllChannelsSidebar from '@/components/chat/AllChannelsSidebar.vue';
import CurrentChannelSidebar from '@/components/chat/CurrentChannelSidebar.vue';
import NewChannelModal from '@/components/chat/NewChannelModal.vue';

import '@/assets/scss/modules/chat/main.scss';
import chatMessageAudio from '@/assets/sounds/chat-message.mp3';

export default {
  name: 'Chat',
  components: {
    SvgPageLoader,
    ChatWindow,
    AllChannelsSidebar,
    CurrentChannelSidebar,
    NewChannelModal,
  },
  provide() {
    return {
      openSidebar: this.openSidebar,
      openCurrentChatSidebar: this.openCurrentChatSidebar,
      closeCurrentChatSidebar: this.closeCurrentChatSidebar,
      openNewChannelModal: this.openNewChannelModal,
    };
  },
  setup() {
    useBodyClass('module-chat');

    const store = useStore();
    store.registerModule('chat', chatStore);

    onUnmounted(() => {
      store.unregisterModule('chat');
    });

    const messageAudio = new Audio(chatMessageAudio);
    store.dispatch('chat/setMessageAudio', messageAudio);

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
  computed: {
    ...mapState('chat', ['activeChannel']),
  },
  watch: {
    activeChannel(val, oldVal) {
      if (val && val !== oldVal) this.currentChatSidebarOpen = true;
    },
  },
  mounted() {},
  methods: {
    openSidebar() {
      this.sidebarOpen = true;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    },
    openCurrentChatSidebar() {
      this.currentChatSidebarOpen = true;
    },
    closeCurrentChatSidebar() {
      this.currentChatSidebarOpen = false;
    },
    openNewChannelModal() {
      this.$refs.newChannelmodal.open();
    },
  },
};
</script>
