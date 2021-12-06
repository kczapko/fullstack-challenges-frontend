<template lang="pug">
.home__header
  h1 Personal info
  p Basic info, like your name and photo
.home__content
  section.profile
    header.profile__header
      .profile__header-left
        h2 Profile
        p.font-500.text-gray Some info may be visible to other people
      .profile__header-right
        base-button(tag="router-link" :to="{ name: 'profile-edit' }") Edit
    .profile__body
      dl.profile__details(v-if="userData.email")
        dt Photo
        dd
          base-user-image(:user="userData")
        dt Name
        dd
          span {{ userData.name }}
        dt Bio
        dd
          span.text-pre-line {{ userData.bio }}
        dt Phone
        dd
          span {{ userData.phone }}
        dt E-mail
        dd
          span {{ userData.email }}
</template>

<script>
import { mapActions } from 'vuex';

import api from '@/api';
import Message from '@/utils/Message';

export default {
  name: 'UserProfile',
  data() {
    return {
      userData: {},
    };
  },
  async created() {
    try {
      const res = await api.account.myData();
      this.userData = res.data.data.me;
    } catch (e) {
      this.addMessage(new Message('There is a problem with getting your data.', 'error'));
    }
  },
  methods: {
    ...mapActions(['addMessage']),
  },
};
</script>
