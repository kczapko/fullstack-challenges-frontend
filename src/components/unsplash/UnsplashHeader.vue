<template lang="pug">
base-header
  template(#logo)
    router-link(:to="{ name: 'unsplash' }")
      svg-logo-my-unsplash
  template(#default)
    .header__search
      .form.form--search
        vee-form.form__form(@submit="search" v-slot="{ values }")
          .form__row
            base-input(name="search" icon="search" placeholder="Search by name" @input="searchQuery = values.search")
    base-button.header__add-photo.font-700(color="primary" @click="$emit('add-photo-click')") Add photo
</template>

<script>
import debounce from 'lodash/debounce';

import SvgLogoMyUnsplash from '@/components/svg/LogoMyUnsplash.vue';

export default {
  name: 'UnsplashHeader',
  components: {
    SvgLogoMyUnsplash,
  },
  emits: ['add-photo-click', 'search-query-updated'],
  data() {
    return {
      searchQuery: '',
      debouncedSearch: null,
    };
  },
  watch: {
    searchQuery() {
      this.debouncedSearch();
    },
  },
  created() {
    this.debouncedSearch = debounce(this.search, 1000);
  },
  methods: {
    search() {
      this.$emit('search-query-updated', this.searchQuery);
    },
  },
};
</script>
