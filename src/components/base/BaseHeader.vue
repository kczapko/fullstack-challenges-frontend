<template lang="pug">
header.header
  .header__logo
    slot(name="logo")
      router-link(:to="{ name: 'dashboard' }")
        svg-logo-dev-challenges
  .header__user(:class="{'header__user--open' : dropdownOpen}" @click.stop)
    .header__user-info(@click="dropdownOpen = !dropdownOpen" @keyup.enter="dropdownOpen = !dropdownOpen" tabindex="0")
      base-user-image.header__user-image(:user="user")
      .header__user-name.font-700 {{ username }}
      .header__user-dropdown-arrow
    transition(name="fade")
      .header__user-dropdown(v-show="dropdownOpen")
        ul.header__user-dropdown-list
          li.header__user-dropdown-listitem
            base-button.header__user-dropdown-link(
              tag="router-link"
              :to="{ name: 'dashboard' }"
              @click="hideDropdown"
              icon="home"
              variant="link"
              size="small") Home
          li.header__user-dropdown-listitem
            base-button.header__user-dropdown-link(
              tag="router-link"
              :to="{ name: 'profile' }"
              @click="hideDropdown"
              icon="account_circle"
              variant="link"
              size="small") My Profile
          li.header__user-dropdown-listitem.header__user-dropdown-listitem--line
          li.header__user-dropdown-listitem
            base-switch.header__user-dropdown-switch.header__user-dropdown-switch--color-schema(:config="colorSchemaConfig" :initial-value="colorSchema" @value-change="setColorSchema")
          li.header__user-dropdown-listitem.header__user-dropdown-listitem--line
          li.header__user-dropdown-listitem
            base-button.header__user-dropdown-link(@click="logoutUser" icon="logout" color="danger" variant="link" size="small") Logout
  slot
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import SvgLogoDevChallenges from '@/components/svg/LogoDevChallenges.vue';

import Message from '@/utils/Message';

export default {
  name: 'BaseHeader',
  components: {
    SvgLogoDevChallenges,
  },
  data() {
    return {
      dropdownOpen: false,
      colorSchemaConfig: [
        {
          name: 'light_mode',
          icon: true,
          value: 'light',
          title: 'Set Light Mode',
        },
        {
          name: 'AUTO',
          icon: false,
          value: 'auto',
          title: 'Set Auto Mode',
        },
        {
          name: 'dark_mode',
          icon: true,
          value: 'dark',
          title: 'Set Dark Mode',
        },
      ],
    };
  },
  computed: {
    ...mapState(['user', 'colorSchema']),
    ...mapGetters(['username']),
  },
  mounted() {
    document.body.addEventListener('click', this.hideDropdown);
  },
  unmounted() {
    document.body.removeEventListener('click', this.hideDropdown);
  },
  methods: {
    ...mapActions(['addMessage', 'setColorSchema']),
    logoutUser() {
      this.$logoutUser();
      this.addMessage(new Message('You were successfully logged out'));
    },
    hideDropdown() {
      if (this.dropdownOpen) this.dropdownOpen = false;
    },
  },
};
</script>
