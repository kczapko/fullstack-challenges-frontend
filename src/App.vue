<template lang="pug">
metainfo
  template(v-slot:title="{ content }") {{ content ? `${content} - Fullstack challenges` : `Fullstack challenges` }}
base-message
router-view
base-cookie-message
</template>

<script>
import { mapState, mapActions } from 'vuex';

import useAppMeta from '@/hooks/useAppMeta';
import useColorSchema from '@/hooks/useColorSchema';
import usePageVisibility from '@/hooks/usePageVisibility';
import useNotifications from '@/hooks/useNotifications';
import useOnlineStatus from '@/hooks/useOnlineStatus';

export default {
  name: 'App',
  setup() {
    useAppMeta();
    useColorSchema();
    usePageVisibility();
    useNotifications();
    useOnlineStatus();
  },
  computed: {
    ...mapState(['loading']),
  },
  watch: {
    loading(val) {
      if (val) this.addBodyClass('loading');
      else this.removeBodyClass('loading');
    },
  },
  methods: {
    ...mapActions(['addBodyClass', 'removeBodyClass']),
  },
};
</script>
