<template lang="pug">
.home
  base-header
  main
    router-view
  base-footer
</template>

<script>
import { mapActions } from 'vuex';

import useBodyClass from '@/hooks/useBodyClass';

import BaseHeader from '@/components/base/BaseHeader.vue';

export default {
  name: 'Home',
  components: {
    BaseHeader,
  },
  setup() {
    useBodyClass('module-home');
  },
  methods: {
    ...mapActions(['addBodyClass', 'removeBodyClass']),
  },
};
</script>
