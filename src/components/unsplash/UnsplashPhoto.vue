<template lang="pug">
li.unsplash-photo(:class="photoClass" :style="photoStyle")
  .unsplash-photo__actions
    base-button(variant="outline" size="small" color="primary") Edit Label
    base-button(variant="outline" size="small" color="danger") Delete
  figure.unsplash-photo__image
    img.unsplash-photo__img(:src="photo.path" :alt="photo.label")
    figcaption.unsplash-photo__caption.font-700 {{ photo.label }}
      small.unsplash-photo__caption-source.font-400
        span source:
        |
        | {{ photo.source }}
</template>

<script>
export default {
  name: 'UnsplashPhoto',
  props: {
    photo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    photoClass() {
      return {
        vertical: this.photo.height > this.photo.width * 1.25,
        horizontal: this.photo.width > this.photo.height * 1.25,
      };
    },
    photoStyle() {
      return {
        // 'aspect-ratio': this.photo.width / this.photo.height,
      };
    },
  },
};
</script>
