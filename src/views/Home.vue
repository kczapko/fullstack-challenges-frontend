<template lang="pug">
.home
  base-header
  confirm-email-form(v-if="!user.emailConfirmed")
  main
    router-view
  base-footer
</template>

<script>
import { mapActions, mapState } from 'vuex';

import ConfirmEmailForm from '@/components/home/ConfirmEmailForm.vue';

import useBodyClass from '@/hooks/useBodyClass';

export default {
  name: 'Home',
  components: {
    ConfirmEmailForm,
  },
  setup() {
    useBodyClass('module-home');
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['addBodyClass', 'removeBodyClass']),
  },
};
</script>
