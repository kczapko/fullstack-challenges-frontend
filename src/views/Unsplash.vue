<template lang="pug">
.unsplash
  unsplash-header(@add-photo-click="openAddPhotoModal")
  main
    p.unsplash__error(v-if="error") {{ error }}
    unsplash-photo-grid(:photos="photos" :search-query="searchQuery")
  base-footer
  //- Modals
  add-photo-modal.unsplash__modal(ref="addPhotoModal" @add-photo="addPhoto")
  edit-photo-modal.unsplash__modal(ref="editPhotoModal" @edit-photo="updatePhoto")
  delete-photo-modal.unsplash__modal(ref="deletePhotoModal" @delete-photo="deletePhoto")
</template>

<script>
import api from '@/api';

import useBodyClass from '@/hooks/useBodyClass';

import UnsplashHeader from '@/components/unsplash/UnsplashHeader.vue';
import UnsplashPhotoGrid from '@/components/unsplash/UnsplashPhotoGrid.vue';

import AddPhotoModal from '@/components/unsplash/AddPhotoModal.vue';
import EditPhotoModal from '@/components/unsplash/EditPhotoModal.vue';
import DeletePhotoModal from '@/components/unsplash/DeletePhotoModal.vue';

import '@/assets/scss/modules/unsplash/main.scss';

export default {
  name: 'Unsplash',
  components: {
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
  data() {
    return {
      photos: [],
      searchQuery: '',
      error: '',
      page: 1,
      perPage: 10,
      total: null,
      loading: false,
    };
  },
  setup() {
    useBodyClass('module-unsplash');
  },
  watch: {
    searchQuery() {
      this.getPhotos();
    },
    '$route.query.q': {
      handler(val) {
        this.page = 1;
        this.total = null;
        this.searchQuery = (val && val.trim()) || '';
      },
      immediate: true,
    },
  },
  async created() {
    if (!this.$route.query.q) await this.getPhotos();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    async getPhotos() {
      this.error = '';

      if (this.loading || this.photos.length === this.total) return;
      this.loading = true;

      try {
        const res = await api.unsplash.myPhotos({
          search: this.searchQuery,
          page: this.page,
          perPage: this.perPage,
        });

        if (this.page === 1) {
          this.total = res.data.data.myUnsplashImages.total;
          this.photos = res.data.data.myUnsplashImages.images;
        } else {
          this.photos.push(...res.data.data.myUnsplashImages.images);
        }
      } catch (err) {
        this.error = err;
      }

      this.loading = false;
    },
    handleScroll() {
      const scroll = window.innerHeight + window.scrollY;
      const bodyHeight = document.body.offsetHeight;

      if (scroll === bodyHeight) {
        if (this.loading) return;

        const nextPage = this.page + 1;
        const morePhotos = this.total + this.perPage > nextPage * this.perPage;

        if (morePhotos) {
          this.page += 1;
          this.getPhotos();
        }
      }
    },
    addPhoto(photo) {
      this.photos.unshift(photo);
    },
    updatePhoto(updatedPhoto) {
      // eslint-disable-next-line no-underscore-dangle
      const photo = this.photos.find((p) => p._id === updatedPhoto._id);
      if (photo) photo.label = updatedPhoto.label;
    },
    deletePhoto(deletedPhoto) {
      // eslint-disable-next-line no-underscore-dangle
      const index = this.photos.findIndex((p) => p._id === deletedPhoto._id);
      if (index >= 0) this.photos.splice(index, 1);
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
