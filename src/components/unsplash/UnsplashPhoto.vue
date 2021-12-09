<template lang="pug">
li.unsplash-photo(:class="photoClass" :style="photoStyle")
  .unsplash-photo__actions(v-if="showActions")
    base-button(variant="outline" size="small" color="primary" @click="openEditPhotoModal(photo)") Edit Label
    base-button(variant="outline" size="small" color="danger" @click="openDeletePhotoModal(photo._id)") Delete
  figure.unsplash-photo__image
    img.unsplash-photo__img(
      :src="visible ? photo.path : require(`@/assets/img/${darkTheme ? 'rings-dark.svg' : 'rings.svg'}`)"
      :width="photo.width"
      :height="photo.height"
      :alt="photo.label"
      v-lazy-load
      ref="image")
    figcaption.unsplash-photo__caption.font-700(v-if="showCaption") {{ photo.label }}
      small.unsplash-photo__caption-source.font-400
        span source:
        |
        | {{ photo.source }}
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'UnsplashPhoto',
  inject: ['openEditPhotoModal', 'openDeletePhotoModal'],
  props: {
    photo: {
      type: Object,
      required: true,
    },
    showCaption: {
      type: Boolean,
      default: false,
    },
    showActions: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    ...mapState(['bodyClasses']),
    photoClass() {
      return {
        vertical: this.photo.height > this.photo.width * 1.25,
        horizontal: this.photo.width > this.photo.height * 1.25,
      };
    },
    photoStyle() {
      return {
        // 'aspect-ratio': this.photo.width / this.photo.height,
        // '--height': Math.round((this.photo.height / this.photo.width) * 2),
      };
    },
    darkTheme() {
      return this.bodyClasses.includes('dark');
    },
  },
  mounted() {
    this.$refs.image.addEventListener('visible', this.imageVisible);
  },
  beforeUnmount() {
    this.$refs.image.removeEventListener('visible', this.imageVisible);
  },
  methods: {
    imageVisible() {
      this.visible = true;
      this.$refs.image.removeEventListener('visible', this.imageVisible);
    },
  },
};
</script>
