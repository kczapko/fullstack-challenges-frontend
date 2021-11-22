<template>
  <div class="home">
    <h1>Home page content</h1>
    <hr />
    <h2>{{ user.name }}</h2>
    <h2>{{ user.email }}</h2>
    <img :src="user.photo" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState('auth', ['user']),
  },
};
</script>
