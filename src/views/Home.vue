<template>
  <div class="home">Home page content</div>
</template>

<script>
import { useMeta } from 'vue-meta';

export default {
  name: 'Home',
  setup() {
    useMeta({
      title: 'Home',
    });
  },
};
</script>
