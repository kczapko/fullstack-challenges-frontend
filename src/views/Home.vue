<template>
  <div class="home">Home page content</div>
  <app-button>Login</app-button>
  <app-button color="primary">Login</app-button>
  <app-button color="danger">Login</app-button>

  <hr />
  <app-button icon="face">Login</app-button>
  <app-button icon="face" color="primary">Login</app-button>
  <app-button icon="face" color="danger">Login</app-button>
</template>

<script>
import { useMeta } from 'vue-meta';
import AppButton from '@/components/base/Button.vue';

export default {
  name: 'Home',
  components: {
    AppButton,
  },
  setup() {
    useMeta({
      title: 'Home',
    });
  },
};
</script>
