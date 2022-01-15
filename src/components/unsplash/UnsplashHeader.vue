<template lang="pug">
base-header
  template(#logo)
    router-link(:to="{ name: 'unsplash' }" aria-label="My Unsplash")
      svg-logo-my-unsplash
  template(#default)
    .header__search
      .form.form--search
        vee-form.form__form(@submit="search" v-slot="{ values }" ref="form")
          .form__row
            base-input(
              name="search"
              icon="search"
              placeholder="Search by name"
              @input="searchQuery = values.search.trim()"
              @change="searchQuery = values.search.trim()")
    base-button.header__add-photo.font-700(color="primary" @click="openAddPhotoModal") Add photo
</template>

<script>
import debounce from 'lodash/debounce';

import SvgLogoMyUnsplash from '@/components/svg/LogoMyUnsplash.vue';

export default {
  name: 'UnsplashHeader',
  components: {
    SvgLogoMyUnsplash,
  },
  inject: ['openAddPhotoModal'],
  data() {
    return {
      searchQuery: '',
    };
  },
  setup() {
    const debouncedSearch = null;

    return {
      debouncedSearch,
    };
  },
  watch: {
    searchQuery() {
      this.debouncedSearch();
    },
    '$route.query.q': {
      handler(val) {
        this.$refs.form.setValues({ search: val || '' });
      },
    },
  },
  created() {
    this.debouncedSearch = debounce(this.search, 1000);
  },
  mounted() {
    this.$refs.form.setValues({ search: this.$route.query.q || '' });
  },
  methods: {
    search() {
      if (this.searchQuery) {
        this.$router.push({ query: { q: this.searchQuery } });
      } else {
        this.$router.push({ query: {} });
      }
    },
  },
};
</script>
