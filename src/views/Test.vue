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

  <hr />
  <base-button disabled circle icon="face" />
  <base-button disabled icon="face" color="primary">Login</base-button>
  <base-button disabled color="danger">Login</base-button>

  <vee-form @submit="submit" :validation-schema="schema" style="width: 50rem; margin: 0 auto">
    <base-input name="pass"></base-input>
    <base-input name="email" type="email"></base-input>
    <base-input name="email1" type="email" label="email1"></base-input>
    <base-input name="email2" type="email" label="email2" placeholder="email"></base-input>
    <base-input
      id="your-email"
      name="email3"
      type="email"
      label="email3"
      placeholder="email"
    ></base-input>
    <base-input
      name="email4"
      type="email"
      label="email4"
      placeholder="email"
      icon="email"
    ></base-input>
    <base-input name="email5" type="email" label="email5" placeholder="email" disabled></base-input>
    <base-input value="test" name="email6" type="email"></base-input>
    <base-input tag="textarea" name="email7" placeholder="placeholder"></base-input>
    <base-input tag="textarea" value="test" name="email8"></base-input>
    <vee-field name="password" type="password"></vee-field>
    <base-button type="submit">Submit</base-button>
    <base-button disabled type="submit">Submit</base-button>
  </vee-form>
</template>

<script>
import { useMeta } from 'vue-meta';

export default {
  name: 'Home',
  methods: {
    submit(values) {
      console.log(values);
    },
  },
  setup() {
    useMeta({
      title: 'Home',
    });

    return {
      schema: {
        email: 'required|min:3|email',
        password: 'required',
      },
    };
  },
};
</script>
