<template lang="pug">
.user-online-status(:class="`user-online-status--${user.online}`" :title="user.online")
</template>

<script>
export default {
  name: 'UserOnlineStatus',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
