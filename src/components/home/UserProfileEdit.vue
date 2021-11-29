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
    .profile__body(v-if="userData.email")
      .profile__body-row.profile__body-row--photo
        base-user-image(:user="userData")
        base-button(variant="link" color="primary" size="small") Change photo
        base-button(variant="link" color="danger" size="small") Delete photo
      .profile__body-row.profile__body-row--form
        .form.form--profile
          p.form__error(v-if="userError") {{ userError }}
          vee-form.form__form(:validation-schema="userSchema" :initial-values="userData" @submit="updateMyData" ref="userDataForm")
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
        base-button(variant="link" color="primary" @click="openChangePasswordModal") Change password
        base-modal(title="Modal Title" footer-button="OK!" closed ref="changePasswordModal")
      .profile__body-row.profile__body-row--delete
        base-button(variant="link" color="danger") Delete account
</template>

<script>
import { mapState, mapActions } from 'vuex';

import api from '@/api';
import Message from '@/utils/Message';

export default {
  name: 'UserProfileEdit',
  setup() {
    const userSchema = {
      name: 'alpha_spaces|max:100',
      bio: 'max:1000',
      phone: 'max:50',
    };

    const emailSchema = {
      email: 'required|email|max:100',
    };

    const passwordSchema = {
      currentPassword: 'required|max:32',
      password: 'required|alpha_num|min:8|max:32',
      confirmPassword: 'passwords_mismatch:@password',
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
      userError: '',
      submitting: false,
    };
  },
  computed: {
    ...mapState(['loading']),
  },
  created() {
    this.getMyData();
  },
  methods: {
    ...mapActions(['setLoading', 'addMessage']),
    ...mapActions('account', ['updateUserData']),
    async getMyData() {
      this.setLoading(true);
      try {
        const res = await api.account.myData();
        this.userData = res.data.data.me;
      } catch (e) {
        this.addMessage(new Message('There is a problem with getting your data.', 'error'));
      }
      this.setLoading(false);
    },
    async updateMyData(values) {
      this.userError = '';
      this.submitting = true;
      this.setLoading(true);

      try {
        await this.updateUserData(values);

        this.addMessage(new Message('Your data has been updated.'));
        await this.getMyData();
        this.$refs.userDataForm.setValues(this.userData);
      } catch (e) {
        // prettier-ignore
        this.userError = e.response?.data?.errors[0]?.message
          || e.response?.message
          || e.message
          || 'Network problems';
      }

      this.submitting = false;
      this.setLoading(false);
    },
    openChangePasswordModal() {
      this.$refs.changePasswordModal.open();
    },
  },
};
</script>
