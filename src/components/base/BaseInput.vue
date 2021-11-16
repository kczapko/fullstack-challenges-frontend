<template lang="pug">
vee-field(:name="name" v-slot="{ field, errors }")
  .base-input(:class="[`base-input--${type}`]")
    label.base-input__label(v-if="label" :for="$attrs.id || field.name") {{ label }}
    .base-input__container
      span.material-icons.base-input__icon(v-if="icon") {{ icon }}
      input.base-input__input(
        v-bind="field"
        :type="type"
        :id="label && ($attrs.id || field.name)"
        :placeholder="$attrs.placeholder"
        :disabled="$attrs.disabled"
      )
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
      required: true,
      default: 'text',
    },
    label: String,
    icon: String,
  },
};
</script>
