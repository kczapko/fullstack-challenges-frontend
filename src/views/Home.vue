<template lang="pug">
.home
  base-header
  router-view
</template>

<script>
import { mapActions } from 'vuex';
import BaseHeader from '@/components/base/BaseHeader.vue';

export default {
  name: 'Home',
  components: {
    BaseHeader,
  },
  mounted() {
    this.addBodyClass('module-home');
  },
  unmounted() {
    this.removeBodyClass('module-home');
  },
  methods: {
    ...mapActions(['addBodyClass', 'removeBodyClass']),
  },
};
</script>
