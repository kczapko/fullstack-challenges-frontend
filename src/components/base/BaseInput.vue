<template>
  <vee-field :name="name" v-slot="{ field, errors }">
    <div class="base-input" :class="[`base-input--${type}`]">
      <label v-if="label" :for="$attrs.id || field.name" class="base-input__label">{{
        label
      }}</label>
      <div class="base-input__container">
        <span v-if="icon" class="material-icons base-input__icon">{{ icon }}</span>
        <input
          v-bind="field"
          :type="type"
          :id="label && ($attrs.id || field.name)"
          :placeholder="$attrs.placeholder"
          :disabled="$attrs.disabled"
          class="base-input__input"
        />
      </div>
      <div v-if="errors.length" class="base-input__errors">
        <p v-for="error in errors" :key="error" class="base-input__error">{{ error }}</p>
      </div>
    </div>
  </vee-field>
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
