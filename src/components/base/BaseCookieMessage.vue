<template lang="pug">
transition(name="fade" appear)
  .cookie-message(v-if="visible")
    p.cookie-message__text This website uses
      |
      |
      a(href="https://developer.mozilla.org/en-US/docs/Glossary/Cookie" rel="noopener noreferrer" target="_blank") cookies
      |
      | and
      |
      a(href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API" rel="noopener noreferrer" target="_blank") storage
      |
      | mechanism to function properly. If you do not accept this, please leave this site.
    base-button(color="primary" @click="acceptCookies") I accept
</template>

<script>
export default {
  name: 'BaseCookieMessage',
  data() {
    return {
      visible: false,
    };
  },
  created() {
    if (!localStorage.getItem('accept-cookies')) this.visible = true;
  },
  methods: {
    acceptCookies() {
      localStorage.setItem('accept-cookies', 1);
      this.visible = false;
    },
  },
};
</script>
