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
</template>

<script>
export default {
  name: 'UserProfileEdit',
};
</script>
