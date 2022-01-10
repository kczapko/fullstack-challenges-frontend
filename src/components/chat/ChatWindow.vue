<template lang="pug">
.chat-window
  header.chat-window__header
    base-button.chat-window__open-sidebar(icon="menu")
    h1.chat-window__channel-name Channel Name
  .chat-window__body
    ul.chat-window__messages
      li.chat-window__message
        .chat-window__message-head
          base-user-image.chat-window__message-userimage(:user="{ name: 'Demo Demo' }")
          p.chat-window__message-username Demo Demo
          time(datetime="2011-11-18T14:54:39.929") today at 1:23
        .chat-window__message-body Morbi eget turpis ut massa luctus cursus. Sed sit amet risus quis neque condimentum aliquet. Phasellus consequat et justo eu accumsan 🙌. Proin pretium id nunc eu molestie. Nam consectetur, ligula vel mattis facilisis, ex mauris venenatis nulla, eget tempor enim neque eget massa 🤣
      li.chat-window__message.chat-window__message--day
        time(datetime="2011-11-28") August 3, 2020
      li.chat-window__message
        .chat-window__message-head
          base-user-image.chat-window__message-userimage(:user="{ name: 'Demo Demo' }")
          p.chat-window__message-username Demo Demo
          time(datetime="2011-11-18T14:54:39.929") today at 1:23
        .chat-window__message-body Morbi eget turpis ut massa luctus cursus. Sed sit amet risus quis neque condimentum aliquet. Phasellus consequat et justo eu accumsan 🙌. Proin pretium id nunc eu molestie. Nam consectetur, ligula vel mattis facilisis, ex mauris venenatis nulla, eget tempor enim neque eget massa 🤣
    .chat-window__form.form
      p.form__error(v-if="error" :title="error") {{ error }}
      vee-form.form__form(:validation-schema="schema" @submit="submit")
        .form__row
          base-input(name="message" placeholder="Type a message here")
        .form__row.form__row--submit
          base-button(type="submit" color="primary" :disabled="submitting" icon="send")
</template>

<script>
export default {
  name: 'ChatWindow',
  data() {
    return {
      submitting: false,
      error: '',
    };
  },
  setup() {
    const schema = {};

    return { schema };
  },
  methods: {
    submit(values) {
      console.log(values);
    },
  },
};
</script>
