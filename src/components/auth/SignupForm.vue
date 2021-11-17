<template lang="pug">
.form.form--signup
  p.form__text.font-600 Join thousands of learners from around the world
  p.form__text Master web development by making real-life projects. There are multiple paths for you to choose
  vee-form.form__form
    .form__row
      base-input(name="email" type="email" icon="email" placeholder="E-mail")
    .form__row
      base-input(name="password" type="password" icon="lock" placeholder="Password")
    .form__row
      base-input(name="passwordConfirm" type="password" icon="lock" placeholder="Confirm Password")
    .form__row.form__row--submit
      base-button.font-600(type="submit" color="primary") Start coding now
  p.form_text.text-gray.text-center or continue with these social profile
  logo-list
  p.form_text.text-gray.text-center Adready a member?
    |
    |
    router-link(:to="{name: 'login'}") Login
</template>

<script>
import LogoList from '@/components/auth/LogoList.vue';

export default {
  name: 'SignupForm',
  components: {
    LogoList,
  },
};
</script>

<style></style>
