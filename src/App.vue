<template>
  <metainfo>
    <template v-slot:title="{ content }">
      {{ content ? `${content} - Fullstack challenge` : `Fullstack challenge` }}
    </template>
  </metainfo>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script>
import { useMeta } from 'vue-meta';

export default {
  name: 'App',
  created() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // document.body.classList.add('dark');
    }
  },
  setup() {
    useMeta({
      title: '',
      htmlAttrs: { lang: 'en' },
    });
  },
};
</script>
