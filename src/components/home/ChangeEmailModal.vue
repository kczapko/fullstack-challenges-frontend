<template lang="pug">
base-modal.base-modal--change-email(modal-title="Change e-mail" ref="modal")
  template(#default="{ isOpen }")
    .form.form--change-email
      p.form__error(v-if="error") {{ error }}
      .form__forms(ref="forms")
        transition(name="fade" @before-enter="beforeFormEnter" appear v-if="isOpen")
          vee-form.form__form(v-if="!newEmail" :validation-schema="emailSchema" @submit="changeMyEmail" ref="changeEmailForm")
            .form__row
              base-input(name="email" type="email" id="newEmail" icon="email" label="New E-mail" placeholder="New E-mail")
            .form__row.form__row--submit
              base-button(type="submit" color="primary" @click="setHeight('submit')" :disabled="submitting") Change e-mail
          vee-form.form__form(v-else-if="newEmail" :validation-schema="tokenSchema" @submit="confirmChangeMyEmail" ref="confirmChangeEmailForm")
            .form__row
              p.form__text There is waiting e-mail change for
                |
                |
                span.font-700 {{ newEmail }}
                |.
              p.form__text
                a(href="#" @click.prevent="cancelMyNewEmail") Cancel it
            .form__row
              base-input(name="currentEmailToken" icon="tag" label="Token from current e-mail" placeholder="Current E-mail Token")
            .form__row
              base-input(name="newEmailtoken" icon="tag" label="Token from new e-mail" placeholder="New E-mail Token")
            .form__row.form__row--submit
              base-button(type="submit" color="primary" @click="setHeight('submit')" :disabled="submitting") Confirm change e-mail
</template>

<script>
import { mapActions } from 'vuex';

import api from '@/api';
import Message from '@/utils/Message';

export default {
  name: 'ChangeEmailModal',
  props: ['newEmail'],
  emits: ['userDataUpdated'],
  setup() {
    const emailSchema = {
      email: 'required|email|max:100',
    };

    const tokenSchema = {
      currentEmailToken: 'required|min:64|max:64',
      newEmailtoken: 'required|min:64|max:64',
    };

    return {
      emailSchema,
      tokenSchema,
    };
  },
  data() {
    return {
      submitting: false,
      error: '',
    };
  },
  created() {
    window.addEventListener('resize', this.setHeight);
  },
  unmounted() {
    window.removeEventListener('resize', this.setHeight);
  },
  methods: {
    ...mapActions(['addMessage']),
    ...mapActions('account', ['confirmMyNewEmail']),
    open() {
      this.$refs.modal.open();
    },
    beforeFormEnter(el) {
      this.$nextTick(() => {
        this.$refs.forms.style.height = `${el.offsetHeight}px`;
      });
    },
    setHeight(e) {
      let height;
      if (!this.$refs.confirmChangeEmailForm && !this.$refs.changeEmailForm) return;
      if (this.newEmail) {
        height = this.$refs.confirmChangeEmailForm.$el.offsetHeight;
      } else {
        height = this.$refs.changeEmailForm.$el.offsetHeight;
      }
      this.$refs.forms.style.height = `${height}px`;
      if (e === 'submit') setTimeout(this.setHeight, 100);
    },
    async changeMyEmail(values) {
      this.error = '';
      this.submitting = true;

      try {
        const res = await api.account.changeMyEmail(values);

        if (res.data.data.changeMyEmail) {
          this.addMessage(new Message('Please confirm that you are owner of new e-mail address.'));
          this.$emit('userDataUpdated');
        } else {
          this.addMessage(new Message('Unexpected error while setting new e-mail.', 'error'));
        }
      } catch (e) {
        // prettier-ignore
        this.error = e.response?.data?.errors[0]?.message
          || e.response?.message
          || e.message
          || 'Network problems';
      }

      this.submitting = false;
    },
    async cancelMyNewEmail() {
      this.error = '';
      this.submitting = true;

      try {
        const res = await api.account.cancelMyNewEmail();

        if (res.data.data.cancelMyNewEmail) {
          this.addMessage(new Message('Your request for e-mail change was removed.'));
          this.$emit('userDataUpdated');
        } else {
          this.addMessage(new Message('Unexpected error while removing new e-mail.', 'error'));
        }
      } catch (e) {
        // prettier-ignore
        this.error = e.response?.data?.errors[0]?.message
          || e.response?.message
          || e.message
          || 'Network problems';
      }

      this.submitting = false;
    },
    async confirmChangeMyEmail(values) {
      this.error = '';
      this.submitting = true;

      try {
        await this.confirmMyNewEmail(values);
        this.addMessage(new Message('Your e-mail has been changed.'));
        this.$emit('userDataUpdated');
        this.$refs.modal.close();
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

<style lang="scss" scoped>
.form__forms {
  overflow: hidden;
  position: relative;
  transition: height 200ms;
  height: 0;

  .form__form {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    &.fade-enter-active,
    &.fade-leave-active {
      pointer-events: none;
    }
  }
}
</style>
