<template lang="pug">
base-modal.base-modal--add-chat-image(:modal-title="`Send image to ${activeChannel.name}`" ref="modal")
  template(#default="{ isOpen }")
    .form.form--add-chat-image
      .form__head
        p.form__text Only .jpg, .png and .webp files are allowed. Maximum 1MB file size.
      base-file-upload(:url="`/files/chat-image/${activeChannel._id}`" @upload-success="uploadSucces" v-if="isOpen")
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Message from '@/utils/Message';

export default {
  name: 'AddChatImageModal',
  computed: {
    ...mapState('chat', ['activeChannel']),
  },
  methods: {
    ...mapActions(['addMessage']),
    open() {
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    uploadSucces() {
      this.addMessage(new Message('Image added.'));
      this.close();
    },
  },
};
</script>
