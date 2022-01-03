<template lang="pug">
teleport(to="#modals")
  .base-modal(:class="{ 'base-modal--opened': isOpen }" v-bind="$attrs")
    .base-modal__background(@click="close")
    .base-modal__modal
      base-button.base-modal__close(circle icon="close" variant="link" @click="close")
      .base-modal__header(v-if="hasHeader")
        slot(name="header" :header-text="modalTitle")
          h3.base-modal__header-title {{ modalTitle }}
      .base-modal__body(v-if="hasBody")
        slot(:isOpen="isOpen" :close="close")
      .base-modal__footer(v-if="hasFooter")
        slot(name="footer" :close="close" :button-text="footerButton")
          base-button.base-modal__footer-button(@click="close" color="primary") {{ footerButton }}
</template>

<script>
export default {
  name: 'BaseModal',
  inheritAttrs: false,
  props: {
    modalTitle: String,
    footerButton: String,
    opened: {
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
      return Boolean(this.$props.modalTitle || this.$slots.header);
    },
    hasBody() {
      return Boolean(this.$slots.default);
    },
    hasFooter() {
      return Boolean(this.$props.footerButton || this.$slots.footer);
    },
  },
  watch: {
    isOpen: {
      handler(val) {
        if (val) {
          this.$emit('opened');
          document.getElementById('modals').classList.add('modal-open');
        } else {
          this.$emit('closed');
          document.getElementById('modals').classList.remove('modal-open');
        }
      },
      flush: 'post',
    },
  },
  created() {
    this.isOpen = this.$props.opened;
  },
  unmounted() {
    document.getElementById('modals').classList.remove('modal-open');
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
