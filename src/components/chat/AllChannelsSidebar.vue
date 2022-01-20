<template lang="pug">
section.all-channels
  .all-channels__header
    h2.all-channels__header-title Channels
    base-button.all-channels__add-channel(icon="add" @click="openNewChannelModal" title="Add Channel")
  .all-channels__body
    p.all-channels__no-channels.font-700(v-if="channels.length === 0")
      span No channels here yet!
      base-button(color="primary" @click="openNewChannelModal") Create a one
    template(v-else)
      .all-channels__search.form.form--search
        vee-form.form__form(@submit="search" v-slot="{ values }")
          .form__row
            base-input(name="search" icon="search" placeholder="Search" @input="searchQuery = values.search.trim()")
      ul.all-channels__channels
        li.all-channels__channel(v-for="channel in filteredChannels" :key="channel._id")
          button.all-channels__channel-button(:title="`Join ${channel.name} Channel`" @click="changeChannel(channel)")
            .all-channels__channel-image
              base-svg-icon.all-channels__channel-img(:text="channel.name")
              span.all-channels__channel-private.material-icons(v-if="channel.isPrivate") lock
            p.all-channels__channel-name.font-700
              ws-client-connection-status(v-if="activeChannel && channel._id === activeChannel._id")
              span {{ channel.name }}
</template>

<script>
import { mapActions, mapState } from 'vuex';

import WsClientConnectionStatus from '@/components/chat/WsClientConnectionStatus.vue';

import Message from '@/utils/Message';

export default {
  name: 'AllChannelsSidebar',
  components: {
    WsClientConnectionStatus,
  },
  inject: ['openCurrentChatSidebar', 'openNewChannelModal', 'openChannelPasswordModal'],
  data() {
    return {
      searchQuery: '',
    };
  },
  computed: {
    ...mapState('chat', ['channels', 'activeChannel', 'clientConnectionStatus']),
    filteredChannels() {
      const channels = [];

      if (this.searchQuery) {
        for (let i = 0; i < this.channels.length; i += 1) {
          const channel = this.channels[i];
          try {
            const regExp = new RegExp(this.searchQuery, 'gi');
            if (channel.name.match(regExp)) channels.push(channel);
          } catch (err) {
            this.addMessage(new Message('Invalid search value', 'error'));
            break;
          }
        }
        return channels;
      }

      return this.channels;
    },
  },
  methods: {
    ...mapActions('chat', ['joinChannel']),
    ...mapActions(['addMessage']),
    search() {},
    changeChannel(channel) {
      if (channel.name === this.activeChannel?.name) {
        if (this.clientConnectionStatus === 'closed') {
          // eslint-disable-next-line no-unused-expressions
          channel.isPrivate
            ? this.openChannelPasswordModal(channel)
            : this.joinChannel(channel.name);
        }
        this.openCurrentChatSidebar();
      } else {
        // eslint-disable-next-line no-unused-expressions
        channel.isPrivate ? this.openChannelPasswordModal(channel) : this.joinChannel(channel.name);
      }
    },
  },
};
</script>
