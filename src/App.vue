<template lang="pug">
metainfo
  template(v-slot:title="{ content }") {{ content ? `${content} - Fullstack challenge` : `Fullstack challenge` }}
base-message
router-view
</template>

<script>
import { mapState, mapActions } from 'vuex';

import useAppMeta from '@/hooks/useAppMeta';

export default {
  name: 'App',
  setup() {
    useAppMeta();
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
