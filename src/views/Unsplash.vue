<template lang="pug">
.unsplash
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
      base-button.header__add-photo.font-700(color="primary" @click="$refs.addPhotoModal.open()") Add photo
  main
    .unsplash-photos
      .unsplash-photos__add-photos(v-if="!photos.length && !searchQuery")
        span.material-icons.text-gray no_photography
        p You don't have any photos.
        base-button(variant="link" icon="image" color="primary" @click="$refs.addPhotoModal.open()") Start adding
      .unsplash-photos__no-results(v-else-if="!photos.length && searchQuery")
        span.material-icons.text-gray search_off
        p You do not have any photos that match the search criteria.
      ul.unsplash-photos__photo-list(v-else-if="photos.length")
        unsplash-photo.unsplash-photos__photo-item(v-for="photo in photos" :key="photo._id" :photo="photo")
  base-footer
  //- Modals
  add-photo-modal.unsplash__modal(ref="addPhotoModal" @add-photo="addPhoto")
  edit-photo-modal.unsplash__modal(ref="editPhotoModal")
  delete-photo-modal.unsplash__modal(ref="deletePhotoModal")
</template>

<script>
import api from '@/api';

import useBodyClass from '@/hooks/useBodyClass';

import SvgLogoMyUnsplash from '@/components/svg/LogoMyUnsplash.vue';
import AddPhotoModal from '@/components/unsplash/AddPhotoModal.vue';
import EditPhotoModal from '@/components/unsplash/EditPhotoModal.vue';
import DeletePhotoModal from '@/components/unsplash/DeletePhotoModal.vue';
import UnsplashPhoto from '@/components/unsplash/UnsplashPhoto.vue';

import '@/assets/scss/modules/unsplash/main.scss';

export default {
  name: 'Unsplash',
  components: {
    SvgLogoMyUnsplash,
    AddPhotoModal,
    EditPhotoModal,
    DeletePhotoModal,
    UnsplashPhoto,
  },
  data() {
    return {
      photos: [],
      searchQuery: '',
    };
  },
  setup() {
    useBodyClass('module-unsplash');
  },
  async created() {
    await this.getPhotos();
  },
  methods: {
    search(values) {
      console.log(values);
    },
    async getPhotos() {
      try {
        const res = await api.unsplash.myPhotos();
        this.photos = res.data.data.myUnsplashImages;
      } catch (err) {
        console.log(err);
      }
    },
    addPhoto(photo) {
      this.photos.unshift(photo);
    },
  },
};
</script>
