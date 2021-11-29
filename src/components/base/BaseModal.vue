<template lang="pug">
teleport(to="#modals")
  .base-modal(:class="{ 'base-modal--opened': isOpen }")
    .base-modal__background(@click="close")
    .base-modal__modal
      base-button.base-modal__close(circle icon="close" variant="link" @click="close")
      .base-modal__header(v-if="hasHeader")
        slot(name="header")
          h3.base-modal__header-title {{ title }}
      .base-modal__body
        slot
      .base-modal__footer(v-if="hasFooter")
        slot(name="footer")
          base-button.base-modal__footer-button(@click="close" color="primary") {{ footerButton }}
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    title: String,
    footerButton: String,
    closed: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['opened', 'closed'],
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    hasHeader() {
      return Boolean(this.$props.title || this.$slots.header);
    },
    hasFooter() {
      return Boolean(this.$props.footerButton || this.$slots.footer);
    },
  },
  watch: {
    isOpen: {
      handler(val) {
        if (val) this.$emit('opened');
        else this.$emit('closed');
      },
      flush: 'post',
    },
  },
  created() {
    this.isOpen = !this.$props.closed;
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
  },
};
</script>
