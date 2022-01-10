<template lang="pug">
section.current-channel
  .current-channel__header
    base-button(icon="arrow_back_ios") All channels
  .current-channel__body
    h2.current-channel__tile.current-channel__title--name Channel name
    p.current-channel__description Pellentesque sagittis elit enim, sit amet ultrices tellus accumsan quis. In gravida mollis purus, at interdum arcu tempor non
    h2.current-channel__tile.current-channel__title--members members
    ul.current-channel__members
      li.current-channel__member
        base-user-image.current-channel__userimage(:user="{ name: 'aaa aaa' }")
        p.current-channel__username AAA AAA
      li.current-channel__member
        base-user-image.current-channel__userimage(:user="{ name: 'aaa aaa' }")
        p.current-channel__username AAA AAA
      li.current-channel__member
        base-user-image.current-channel__userimage(:user="{ name: 'aaa aaa' }")
        p.current-channel__username AAA AAA
</template>

<script>
export default {
  namw: 'CurrentChannelSidebar',
};
</script>
