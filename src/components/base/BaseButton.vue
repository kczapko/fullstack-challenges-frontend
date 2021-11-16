<template>
  <button class="btn" :class="cssClass">
    <span v-if="icon" class="material-icons btn__icon">{{ icon }}</span>
    <span v-if="hasSlot" class="btn__text"><slot></slot></span>
  </button>
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
  },
  computed: {
    cssClass() {
      return {
        [`btn--${this.color}`]: true,
        'btn--circle': this.circle,
      };
    },
    hasSlot() {
      return this.$slots.default ? 1 : 0;
    },
  },
};
</script>
