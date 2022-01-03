<template lang="pug">
.home
  base-header
  confirm-email-form(v-if="!user.emailConfirmed")
  main
    router-view
  base-footer
</template>

<script>
import { mapState } from 'vuex';

import ConfirmEmailForm from '@/components/home/ConfirmEmailForm.vue';

import useBodyClass from '@/hooks/useBodyClass';

import '@/assets/scss/modules/home/main.scss';

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
};
</script>
