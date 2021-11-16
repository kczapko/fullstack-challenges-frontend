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

  <vee-form @submit="submit" :validation-schema="schema" v-slot="{ errors }">
    {{ errors }}
    <vee-field name="email" type="email"></vee-field>
    <vee-field name="password" type="password"></vee-field>
    <base-button type="submit">Submit</base-button>
  </vee-form>
</template>

<script>
import { useMeta } from 'vue-meta';
import BaseButton from '../components/base/BaseButton.vue';

export default {
  components: { BaseButton },
  name: 'Home',
  data() {
    return {
      schema: {
        email: 'required|email',
        password: 'required',
      },
    };
  },
  methods: {
    submit(values) {
      console.log(values);
    },
  },
  setup() {
    useMeta({
      title: 'Home',
    });
  },
};
</script>
