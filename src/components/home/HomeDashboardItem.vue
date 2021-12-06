<template lang="pug">
li.dashboard__item
  a.dashboard__link(href="#" :class="{'dashboard__link--inactive': comingSoon}")
    span.dashboard__logo
      slot(name="logo")
    span.dashboard__name.font-600(v-if="name") {{ name }}
    span.dashboard__coming-soon.font-300(v-if="comingSoon") Coming Soon
</template>

<script>
export default {
  name: 'HomeDashboardItem',
  props: {
    name: String,
    comingSoon: Boolean,
  },
};
</script>
