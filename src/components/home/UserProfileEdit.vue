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
        change-user-data-form.profile__form(:user-data="userData" @userDataUpdated="getMyData")
      .profile__body-row.profile__body-row--email
        base-input(name="email" label="E-mail" :value="userData.email" disabled)
        base-button(variant="link" color="primary"  @click="openModal('changeEmailModal')") Change e-mail
        change-email-modal.profile__modal(ref="changeEmailModal" :new-email="userData.newEmail" @userDataUpdated="getMyData")
      .profile__body-row.profile__body-row--password
        base-button(variant="link" color="primary" @click="openModal('changePasswordModal')") Change password
        change-password-modal.profile__modal(ref="changePasswordModal")
      .profile__body-row.profile__body-row--delete
        base-button(variant="link" color="danger" @click="openModal('deleteAccountModal')") Delete account
        delete-account-modal.profile__modal(ref="deleteAccountModal")
</template>

<script>
import { mapActions } from 'vuex';

import api from '@/api';
import Message from '@/utils/Message';

import ChangeUserDataForm from '@/components/home/ChangeUserDataForm.vue';
import ChangeEmailModal from '@/components/home/ChangeEmailModal.vue';
import ChangePasswordModal from '@/components/home/ChangePasswordModal.vue';
import DeleteAccountModal from '@/components/home/DeleteAccountModal.vue';

export default {
  name: 'UserProfileEdit',
  components: {
    ChangeUserDataForm,
    ChangeEmailModal,
    ChangePasswordModal,
    DeleteAccountModal,
  },
  data() {
    return {
      userData: {},
    };
  },
  created() {
    this.getMyData();
  },
  methods: {
    ...mapActions(['addMessage']),
    async getMyData() {
      try {
        const res = await api.account.myData();
        this.userData = res.data.data.me;
      } catch (e) {
        this.addMessage(new Message('There is a problem with getting your data.', 'error'));
      }
    },
    openModal(name) {
      this.$refs[name].open();
    },
  },
};
</script>
