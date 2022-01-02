<template lang="pug">
.base-switch
  .base-switch__header
    .base-switch__header-cell(v-for="(item, i) in config" :class="{'base-switch__header-cell--active': active === i}" :title="item.title")
      .base-switch__header-cell-name(@click="setValue(item.value)")
        span.base-switch__header-cell-icon.material-icons(v-if="item.icon") {{item.name}}
        span.base-switch__header-cell-text(v-else) {{item.name}}
  .base-switch__body
    .base-switch__body-cell(v-for="(item, i) in config" @click="setValue(item.value)" :title="item.title")
  .base-switch__indicator(:style="indicatorStyles")
</template>

<script>
export default {
  name: 'BaseSwitch',
  props: {
    config: {
      type: Array,
      required: true,
      validator(val) {
        if (val.length < 2) return false;

        for (let i = 0; i < val.length; i += 1) {
          const keys = Object.keys(val[i]);
          if (
            !(
              // prettier-ignore
              keys.includes('name')
              && keys.includes('icon')
              && keys.includes('value')
              && keys.includes('title')
            )
          ) {
            return false;
          }
        }

        return true;
      },
    },
    initialValue: {
      required: true,
    },
  },
  emits: ['value-change'],
  data() {
    return {
      value: this.initialValue,
    };
  },
  computed: {
    active() {
      return this.config.findIndex((c) => c.value === this.value);
    },
    indicatorStyles() {
      return {
        '--i': this.active + 1,
        '--total': this.config.length,
      };
    },
  },
  watch: {
    value(val) {
      this.$emit('value-change', val);
    },
  },
  methods: {
    setValue(val) {
      this.value = val;
    },
  },
};
</script>
