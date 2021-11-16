<template>
  <div class="home">Home page content</div>
  <base-button>Login</base-button>
  <base-button color="primary">Login</base-button>
  <base-button color="danger">Login</base-button>

  <hr />
  <base-button icon="face">Login</base-button>
  <base-button icon="face" color="primary">Login</base-button>
  <base-button icon="face" color="danger">Login</base-button>

  <hr />
  <base-button circle icon="face" />
  <base-button circle icon="face" color="primary" />
  <base-button circle icon="face" color="danger" />

  <hr />
  <base-button tag="a" circle icon="face" />
  <base-button tag="a" icon="face" color="primary">Login</base-button>
  <base-button tag="a" color="danger">Login</base-button>
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
