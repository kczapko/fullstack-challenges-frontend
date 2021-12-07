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
    p Unsplash
  base-footer
  //- Modals
  add-photo-modal.unsplash__modal(ref="addPhotoModal")
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

import '@/assets/scss/modules/unsplash/main.scss';

export default {
  name: 'Unsplash',
  components: {
    SvgLogoMyUnsplash,
    AddPhotoModal,
    EditPhotoModal,
    DeletePhotoModal,
  },
  data() {
    return {
      photos: [],
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
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
