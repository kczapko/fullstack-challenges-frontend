<template lang="pug">
.form.form--change-user-data
  p.form__error(v-if="error") {{ error }}
  vee-form.form__form(:validation-schema="schema" :initial-values="userData" @submit="submit" ref="form" v-slot="{ meta }")
    .form__row
      base-input(name="name" label="Name" placeholder="Enter your name...")
    .form__row
      base-input(name="bio" label="Bio" tag="textarea" placeholder="Enter your bio")
    .form__row
      base-input(name="phone" label="Phone" placeholder="Enter your phone...")
    .form__row.form__row--submit
      base-button(type="submit" color="primary" :disabled="submitting || !meta.dirty") Save
</template>

<script>
import { mapActions } from 'vuex';

import Message from '@/utils/Message';

export default {
  name: 'ChangeUserDataForm',
  props: {
    userData: Object,
  },
  emits: ['userDataUpdated'],
  setup() {
    const schema = {
      name: 'alpha_spaces|max:100',
      bio: 'max:1000',
      phone: 'max:50',
    };

    return {
      schema,
    };
  },
  data() {
    return {
      error: '',
      submitting: false,
    };
  },
  watch: {
    userData() {
      this.$refs.form.setValues(this.userData);
    },
  },
  methods: {
    ...mapActions(['addMessage']),
    ...mapActions('account', ['updateUserData']),
    async submit(values) {
      this.error = '';
      this.submitting = true;

      try {
        await this.updateUserData(values);

        this.addMessage(new Message('Your data has been updated.'));
        this.$emit('userDataUpdated');
      } catch (e) {
        // prettier-ignore
        this.error = e.response?.data?.errors[0]?.message
          || e.response?.message
          || e.message
          || 'Network problems';
      }

      this.submitting = false;
    },
  },
};
</script>
