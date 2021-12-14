<template lang="pug">
section.product-view
  .product-view__back
   a.product-view__back-link(href="#")
    span.material-icons keyboard_backspace
    |
    | Back
  .product-view__image
    img.product-view__image-img(src="https://fullstack.kczapko.pl/images/user/61aa9905156886e291e16024/unsplash-1638925309419-9352346591374125.webp" alt="Product Name")
  dl.product-view__description
    dt.product-view__description-title name
    dd.product-view__description-value
      h2.product-view__product-name.font-500 Avocado
    dt.product-view__description-title category
    dd.product-view__description-value Fruit and vegetables
    dt.product-view__description-title note
    dd.product-view__description-value Nutrient-dense foods are those that provide substantial amounts of vitamins, minerals and other nutrients with relatively few calories. One-third of a medium avocado (50 g) has 80 calories and contributes nearly 20 vitamins and minerals, making it a great nutrient-dense food choice.
  footer.product-view__footer
    base-button(type="button") Delete
    base-button(type="submit" color="primary" :disabled="submitting") Add to list
</template>

<script>
export default {
  name: 'ProductView',
};
</script>
