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
  setup() {
    const { meta } = useMeta({
      title: '',
      htmlAttrs: { lang: 'en' },
      bodyAttrs: {},
    });

    const setColorSchemeClass = (e) => {
      if (e.matches) meta.bodyAttrs.class = ['dark'];
      else meta.bodyAttrs.class = [];
    };

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', setColorSchemeClass);
    setColorSchemeClass(window.matchMedia('(prefers-color-scheme: dark)'));
  },
};
</script>
