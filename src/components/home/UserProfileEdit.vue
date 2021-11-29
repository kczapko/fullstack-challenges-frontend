<template lang="pug">
base-button.home__back(
  tag="router-link"
  :to="{ name: 'profile' }"
  variant="link"
  color="primary"
  icon="chevron_left") Back
.home__content
  section.profile
    header.profile__header
      .profile__header-left
        h2 Change Info
        p.font-500.text-gray Changes will be reflected to every services
    .profile__body(v-if="!loading")
      .profile__body-row.profile__body-row--photo
        base-user-image(:user="userData")
        base-button(variant="link" color="primary") Change photo
      .profile__body-row.profile__body-row--form
        .form.form--profile
          vee-form.form__form(:validation-schema="userSchema" :initial-values="userData" @submit="submit")
            .form__row
              base-input(name="name" placeholder="Enter your name...")
            .form__row
              base-input(name="bio" tag="textarea" placeholder="Enter your bio")
            .form__row
              base-input(name="phone" placeholder="Enter your phone...")
            .form__row.form__row--submit
              base-button(type="submit" color="primary" :disabled="submitting") Save
      .profile__body-row.profile__body-row--email
        base-input(name="email" :value="userData.email" disabled)
        base-button(variant="link" color="primary") Change email
      .profile__body-row.profile__body-row--password
        base-button(variant="link" color="primary") Change password
</template>

<script>
import { mapState, mapActions } from 'vuex';

import api from '@/api';
import Message from '@/utils/Message';

export default {
  name: 'UserProfileEdit',
  setup() {
    const userSchema = {
      name: '',
      bio: '',
      phone: '',
    };

    const emailSchema = {
      email: '',
    };

    const passwordSchema = {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    };

    return {
      userSchema,
      emailSchema,
      passwordSchema,
    };
  },
  data() {
    return {
      userData: {},
      submitting: false,
    };
  },
  computed: {
    ...mapState(['loading']),
  },
  async created() {
    this.setLoading(true);
    try {
      const res = await api.account.myData();
      this.userData = res.data.data.me;
    } catch (e) {
      this.addMessage(new Message('There is a problem with getting your data.', 'error'));
    }
    this.setLoading(false);
  },
  methods: {
    ...mapActions(['setLoading', 'addMessage']),
    submit(values) {
      console.log(values);
    },
  },
};
</script>
