<template lang="pug">
metainfo
  template(v-slot:title="{ content }") {{ content ? `${content} - Fullstack challenge` : `Fullstack challenge` }}
base-message
router-view(:style="{ 'pointer-events': loading ? 'none' : '' }")
</template>

<script>
import { mapState } from 'vuex';

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
      if (val) document.body.style.cursor = 'wait';
      else document.body.style.cursor = '';
    },
  },
};
</script>
