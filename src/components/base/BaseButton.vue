<template>
  <component :is="tag" class="base-btn" :class="cssClass">
    <span v-if="icon" class="material-icons base-btn__icon">{{ icon }}</span>
    <span v-if="hasSlot" class="base-btn__text"><slot></slot></span>
  </component>
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
