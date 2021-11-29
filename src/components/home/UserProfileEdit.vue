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
              base-input(name="name" label="Name" placeholder="Enter your name...")
            .form__row
              base-input(name="bio" label="Bio" tag="textarea" placeholder="Enter your bio")
            .form__row
              base-input(name="phone" label="Phone" placeholder="Enter your phone...")
            .form__row.form__row--submit
              base-button(type="submit" color="primary" :disabled="submitting") Save
      .profile__body-row.profile__body-row--email
        base-input(name="email" label="E-mail" :value="userData.email" disabled)
        base-button(variant="link" color="primary"  @click="openModal('changeEmailModal')") Change email
        base-modal.profile__modal(modal-title="Change email" closed ref="changeEmailModal")
          .form.form--change-email
            p.form__error(v-if="changeEmailError") {{ changeEmailError }}
            vee-form.form__form(:validation-schema="emailSchema" @submit="changeMyEmail" ref="changeEmailForm")
              .form__row
                base-input(name="email" type="email" icon="email" label="E-mail" placeholder="New E-mail")
              .form__row.form__row--submit
                base-button(type="submit" color="primary" :disabled="submitting") Change e-mail
            vee-form.form__form(:validation-schema="tokenSchema" @submit="confirmChangeMyEmail" ref="confirmChangeEmailForm")
              .form__row
                base-input(name="oldEmailToken" icon="tag" label="Token from current e-mail" placeholder="Current E-mail Token")
              .form__row
                base-input(name="newEmailtoken" icon="tag" label="Token from new e-mail" placeholder="New E-mail Token")
              .form__row.form__row--submit
                base-button(type="submit" color="primary" :disabled="submitting") Confirm change e-mail
      .profile__body-row.profile__body-row--password
        base-button(variant="link" color="primary" @click="openModal('changePasswordModal')") Change password
        base-modal.profile__modal(modal-title="Change password" closed ref="changePasswordModal")
          .form.form--change-password
            p.form__error(v-if="changePasswordError") {{ changePasswordError }}
            vee-form.form__form(:validation-schema="passwordSchema" @submit="changeMyPassword" ref="changePasswordForm")
              .form__row
                base-input(name="currentPassword" type="password" icon="lock" label="Current Password" placeholder="Enter your current password...")
              .form__row
                base-input(name="password" type="password" icon="lock" label="New Password" placeholder="Enter new password...")
              .form__row
                base-input(name="passwordConfirm" type="password" icon="lock" label="Confirm New Password" placeholder="Confirm new password...")
              .form__row.form__row--submit
                base-button(type="submit" color="primary" :disabled="submitting") Change password
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
      passwordConfirm: 'passwords_mismatch:@password',
    };

    const tokenSchema = {
      oldEmailToken: 'required|min:64|max:64',
      newEmailtoken: 'required|min:64|max:64',
    };

    return {
      userSchema,
      emailSchema,
      passwordSchema,
      tokenSchema,
    };
  },
  data() {
    return {
      userData: {},
      userError: '',
      changePasswordError: '',
      changeEmailError: '',
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
    openModal(name) {
      this.$refs[name].open();
    },
    async changeMyPassword(values) {
      this.changePasswordError = '';
      this.submitting = true;
      this.setLoading(true);

      try {
        const res = await api.account.changeMyPassword(values);

        if (res.data.data.changeMyPassword) {
          this.addMessage(new Message('Password changed.'));
          this.$refs.changePasswordForm.resetForm();
          this.$refs.changePasswordModal.close();
          this.$logoutUser();
          this.addMessage(new Message('Please login with your new password.'));
        } else {
          this.addMessage(new Message('Unexpected error while setting new password.', 'error'));
        }
      } catch (e) {
        // prettier-ignore
        this.changePasswordError = e.response?.data?.errors[0]?.message
          || e.response?.message
          || e.message
          || 'Network problems';
      }

      this.submitting = false;
      this.setLoading(false);
    },
    changeMyEmail() {},
  },
};
</script>
