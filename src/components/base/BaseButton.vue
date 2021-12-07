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
        return ['a', 'button', 'router-link'].includes(val);
      },
      default: 'button',
    },
    variant: {
      type: String,
      validator(val) {
        return ['default', 'link', 'outline'].includes(val);
      },
      default: 'default',
    },
    size: {
      type: String,
      validator(val) {
        return ['default', 'small'].includes(val);
      },
      default: 'default',
    },
  },
  computed: {
    cssClass() {
      return {
        [`base-btn--${this.color}`]: true,
        'base-btn--circle': this.circle,
        [`base-btn--variant-${this.variant}`]: this.variant !== 'default',
        [`base-btn--size-${this.size}`]: this.size !== 'default',
      };
    },
    hasSlot() {
      return Boolean(this.$slots.default);
    },
  },
};
</script>
