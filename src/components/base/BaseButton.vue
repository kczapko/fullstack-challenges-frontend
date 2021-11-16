<template lang="pug">
component.base-btn(:is="tag" :class="cssClass")
  span.material-icons.base-btn__icon(v-if="icon") {{ icon }}
  span.base-btn__text(v-if="hasSlot")
    slot
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    color: {
      type: String,
      validator(val) {
        return ['default', 'primary', 'danger'].includes(val);
      },
      default: 'default',
    },
    icon: String,
    circle: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      validator(val) {
        return ['a', 'button'].includes(val);
      },
      default: 'button',
    },
  },
  computed: {
    cssClass() {
      return {
        [`base-btn--${this.color}`]: true,
        'base-btn--circle': this.circle,
      };
    },
    hasSlot() {
      return this.$slots.default ? 1 : 0;
    },
  },
};
</script>
