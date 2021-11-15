<template>
  <button class="btn" :class="cssClass">
    <span v-if="icon" class="material-icons btn__icon">{{ icon }}</span>
    <span><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    color: {
      type: String,
      validator(val) {
        return ['default', 'primary', 'danger'].includes(val);
      },
      default: 'default',
    },
    icon: String,
  },
  computed: {
    cssClass() {
      return {
        [`btn--${this.color}`]: true,
      };
    },
  },
};
</script>
