<template lang="pug">
header.header
  .header__left
    .header__logo
      slot(name="logo")
        router-link(:to="{ name: 'dashboard' }")
          SvgLogoDevChallenges
  .header__right
    .header__user(:class="{'header__user--open' : dropdownOpen}")
      .header__user-info(@click="dropdownOpen = !dropdownOpen")
        base-user-image.header__user-image(:user="user")
        .header__user-name {{ username }}
        .header__user-dropdown-arrow
      transition(name="fade")
        .header__user-dropdown(v-show="dropdownOpen")
          ul.header__user-dropdown-list
            li.header__user-dropdown-listitem
              base-button.header__user-dropdown-link(tag="router-link"  :to="{ name: 'home' }" icon="account_circle" variant="link" size="small") My Profile
            li.header__user-dropdown-listitem
              base-button.header__user-dropdown-link(tag="a" icon="group" variant="link" size="small") Group Chat
            li.header__user-dropdown-listitem.header__user-dropdown-listitem--line
            li.header__user-dropdown-listitem
              base-button.header__user-dropdown-link(tag="a" @click.prevent="logoutUser" icon="logout" color="danger" variant="link" size="small") Logout
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import SvgLogoDevChallenges from '@/components/svg/LogoDevChallenges.vue';

export default {
  name: 'BaseHeader',
  components: {
    SvgLogoDevChallenges,
  },
  data() {
    return {
      dropdownOpen: false,
    };
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['username']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async logoutUser() {
      await this.$router.push({ name: 'login' });
      this.logout();
    },
  },
};
</script>
