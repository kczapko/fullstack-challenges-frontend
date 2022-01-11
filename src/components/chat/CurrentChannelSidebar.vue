<template lang="pug">
section.current-channel
  .current-channel__header
    base-button.current-channel__all-channels.font-700(icon="arrow_back_ios") All channels
  .current-channel__body
    h2.current-channel__title.current-channel__title--name.font-700 Channel name
    p.current-channel__description Pellentesque sagittis elit enim, sit amet ultrices tellus accumsan quis. In gravida mollis purus, at interdum arcu tempor non
    h2.current-channel__title.current-channel__title--members.font-700 Members
    ul.current-channel__members
      li.current-channel__member
        base-user-image.current-channel__userimage(:user="{ name: 'aaa aaa', photo: 'http://127.0.0.1:3333/images/user/61aa16ff47e02bb3d9e1892a/user-1638807356581.webp' }")
        p.current-channel__username.font-700 Some User
      li.current-channel__member
        base-user-image.current-channel__userimage(:user="{ name: 'aaa aaa' }")
        p.current-channel__username.font-700 AAA AAA
      li.current-channel__member
        base-user-image.current-channel__userimage(:user="{ email: 'example@example.com' }")
        p.current-channel__username.font-700 example@example.com
</template>

<script>
export default {
  namw: 'CurrentChannelSidebar',
};
</script>
