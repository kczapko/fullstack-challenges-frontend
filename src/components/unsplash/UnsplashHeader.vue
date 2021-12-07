<template lang="pug">
base-header
  template(#logo)
    router-link(:to="{ name: 'unsplash' }")
      svg-logo-my-unsplash
  template(#default)
    .header__search
      .form.form--search
        vee-form.form__form(@submit="search")
          .form__row
            base-input(name="search" icon="search" placeholder="Search by name")
    base-button.header__add-photo.font-700(color="primary" @click="$emit('add-photo-click')") Add photo
</template>

<script>
import SvgLogoMyUnsplash from '@/components/svg/LogoMyUnsplash.vue';

export default {
  name: 'UnsplashHeader',
  components: {
    SvgLogoMyUnsplash,
  },
  emits: ['add-photo-click'],
  methods: {
    search(values) {
      console.log(values);
    },
  },
};
</script>
