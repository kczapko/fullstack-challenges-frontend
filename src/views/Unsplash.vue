<template lang="pug">
svg-page-loader(v-if="!pageLoaded")
.unsplash(v-if="pageLoaded")
  unsplash-header
  main
    p.unsplash__error(v-if="error") {{ error }}
    unsplash-photo-grid(:photos="photos" :search-query="searchQuery")
    .unsplash__observer(ref="unsplashObserver")
  base-footer
  //- Modals
  add-photo-modal.unsplash__modal(ref="addPhotoModal" @add-photo="addPhoto")
  edit-photo-modal.unsplash__modal(ref="editPhotoModal" @edit-photo="updatePhoto")
  delete-photo-modal.unsplash__modal(ref="deletePhotoModal" @delete-photo="deletePhoto")
</template>

<script>
import { mapState } from 'vuex';

import api from '@/api';

import useBodyClass from '@/hooks/useBodyClass';

import SvgPageLoader from '@/components/svg/PageLoader.vue';

import UnsplashHeader from '@/components/unsplash/UnsplashHeader.vue';
import UnsplashPhotoGrid from '@/components/unsplash/UnsplashPhotoGrid.vue';

import AddPhotoModal from '@/components/unsplash/AddPhotoModal.vue';
import EditPhotoModal from '@/components/unsplash/EditPhotoModal.vue';
import DeletePhotoModal from '@/components/unsplash/DeletePhotoModal.vue';

import '@/assets/scss/modules/unsplash/main.scss';

export default {
  name: 'Unsplash',
  components: {
    SvgPageLoader,
    UnsplashHeader,
    UnsplashPhotoGrid,
    AddPhotoModal,
    EditPhotoModal,
    DeletePhotoModal,
  },
  provide() {
    return {
      openAddPhotoModal: this.openAddPhotoModal,
      openEditPhotoModal: this.openEditPhotoModal,
      openDeletePhotoModal: this.openDeletePhotoModal,
    };
  },
  setup() {
    useBodyClass('module-unsplash');

    const observer = null;

    return {
      observer,
    };
  },
  data() {
    return {
      photos: [],
      searchQuery: '',
      error: '',
      skip: 0,
      perPage: 20,
      total: null,
      pageLoaded: false,
    };
  },
  computed: {
    ...mapState(['loading']),
  },
  watch: {
    searchQuery() {
      this.skip = 0;
      this.total = null;
      this.getPhotos();
    },
    '$route.query.q': {
      handler(val) {
        this.skip = 0;
        this.total = null;
        this.searchQuery = (val && val.trim()) || '';
      },
      immediate: true,
    },
    pageLoaded: {
      handler(val) {
        if (val) {
          this.observer.observe(this.$refs.unsplashObserver);
        }
      },
      flush: 'post',
    },
  },
  async created() {
    if (!this.$route.query.q) await this.getPhotos();
  },
  mounted() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.getPhotos();
        }
      });
    };

    this.observer = new IntersectionObserver(observerCallback, observerOptions);
  },
  methods: {
    async getPhotos() {
      this.error = '';

      if (this.loading || this.skip === this.total) return;

      try {
        const res = await api.unsplash.myPhotos({
          search: this.searchQuery,
          skip: this.skip,
          perPage: this.perPage,
        });

        if (this.skip === 0) {
          this.photos = res.data.data.myUnsplashImages.images;
        } else {
          this.photos.push(...res.data.data.myUnsplashImages.images);
        }
        this.total = res.data.data.myUnsplashImages.total;
        this.skip += res.data.data.myUnsplashImages.images.length;
      } catch (err) {
        this.error = err;
      }
      if (!this.pageLoaded) this.pageLoaded = true;
    },
    addPhoto(photo) {
      this.photos.unshift(photo);
      this.skip += 1;
      this.total += 1;
    },
    updatePhoto(updatedPhoto) {
      // eslint-disable-next-line no-underscore-dangle
      const photo = this.photos.find((p) => p._id === updatedPhoto._id);
      if (photo) photo.label = updatedPhoto.label;
    },
    deletePhoto(deletedPhoto) {
      // eslint-disable-next-line no-underscore-dangle
      const index = this.photos.findIndex((p) => p._id === deletedPhoto._id);
      if (index >= 0) {
        this.photos.splice(index, 1);
        this.total -= 1;
        this.skip -= 1;
      }
    },
    openAddPhotoModal() {
      this.$refs.addPhotoModal.open();
    },
    openEditPhotoModal(photo) {
      this.$refs.editPhotoModal.open(photo);
    },
    openDeletePhotoModal(id) {
      this.$refs.deletePhotoModal.open(id);
    },
  },
};
</script>
