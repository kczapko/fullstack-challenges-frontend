<template lang="pug">
.unsplash
  base-header
    template(#logo)
      router-link(:to="{ name: 'unsplash' }")
        svg-logo-my-unsplash
    template(#default)
      .header__search
        .form.form--search
          vee-form.form__form(:validation-schema="schema" @submit="submit")
            .form__row
              base-input(name="search" icon="search" placeholder="Search by name")
      base-button.header__add-photo.font-700(color="primary") Add photo
  main
    p Unsplash
  base-footer
</template>

<script>
import useBodyClass from '@/hooks/useBodyClass';

import SvgLogoMyUnsplash from '@/components/svg/LogoMyUnsplash.vue';

import '@/assets/scss/modules/unsplash/main.scss';

export default {
  name: 'Unsplash',
  components: {
    SvgLogoMyUnsplash,
  },
  setup() {
    useBodyClass('module-unsplash');
  },
};
</script>
