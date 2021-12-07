<template lang="pug">
.unsplash
  unsplash-header(@add-photo-click="openAddPhotoModal" @search-query-updated="updateSearch")
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
      openEditPhotoModal: this.openEditPhotoModal,
      openDeletePhotoModal: this.openDeletePhotoModal,
    };
  },
  data() {
    return {
      photos: [],
      searchQuery: '',
      error: '',
    };
  },
  setup() {
    useBodyClass('module-unsplash');
  },
  watch: {
    searchQuery() {
      this.getPhotos();
    },
  },
  async created() {
    await this.getPhotos();
  },
  methods: {
    async getPhotos() {
      this.error = '';

      try {
        const res = await api.unsplash.myPhotos({ search: this.searchQuery });
        this.photos = res.data.data.myUnsplashImages;
      } catch (err) {
        this.error = err;
      }
    },
    async updateSearch(val) {
      this.searchQuery = val.trim();
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
