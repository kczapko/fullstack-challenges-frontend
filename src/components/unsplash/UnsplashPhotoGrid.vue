<template lang="pug">
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
</template>

<script>
import UnsplashPhoto from '@/components/unsplash/UnsplashPhoto.vue';

export default {
  name: 'UnsplashPhotoGrid',
  components: {
    UnsplashPhoto,
  },
  props: {
    photos: {
      type: Array,
      required: true,
    },
    searchQuery: {
      type: String,
      required: true,
    },
  },
};
</script>
