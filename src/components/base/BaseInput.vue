<template lang="pug">
vee-field(:name="name" v-slot="{ field, errors, resetField }")
  .base-input
    label.base-input__label(v-if="label" :for="$attrs.id || field.name") {{ label }}
    .base-input__container
      span.material-icons.base-input__icon(v-if="icon") {{ icon }}
      component(
        :is="tag"
        v-bind="{...$attrs, ...field}"
        :type="tag === 'input' ? type : null"
        :id="label && ($attrs.id || field.name)"
        :class="[`base-input__input`, `base-input__input--${tag}`, `base-input__input--${type}`, { error: errors.length }]"
      )
      a(v-if="$attrs.value" href="#" :style="{ display: 'none' }" @click.prevent="resetField({value: $attrs.value})" ref="updateValueLink")
    .base-input__errors(v-if="errors.length")
      p.base-input__error(v-for="error in errors" :key="error") {{ error }}
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    label: String,
    icon: String,
    tag: {
      type: String,
      validator(val) {
        return ['input', 'textarea'].includes(val);
      },
      default: 'input',
    },
  },
  watch: {
    '$attrs.value': {
      handler() {
        this.$refs.updateValueLink.click();
      },
    },
  },
};
</script>
