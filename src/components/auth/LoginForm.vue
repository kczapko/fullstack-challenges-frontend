<template lang="pug">
.form.form--login
  p.form__text.font-600 Join thousands of learners from around the world
  p.form__text Master web development by making real-life projects. There are multiple paths for you to choose
  vee-form.form__form
    .form__row
      base-input(name="email" type="email" icon="email" placeholder="E-mail")
    .form__row
      base-input(name="password" type="password" icon="lock" placeholder="Password")
    .form__row.form__row--submit
      base-button.font-600(type="submit" color="primary") Login
  p.form__text.text-gray.text-center or continue with these social profile
  logo-list
  p.form__text.text-gray.text-center Don’t have an account yet?
    |
    |
    router-link(:to="{name: 'signup'}") Register
</template>

<script>
import LogoList from '@/components/auth/LogoList.vue';

export default {
  name: 'LoginForm',
  components: {
    LogoList,
  },
};
</script>

<style></style>
