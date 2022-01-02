<template lang="pug">
section.top-chart
  h2.top-chart__title {{ title }}
  ul.top-chart__stats
    top-chart-bar(v-for="(item, i) in items" :name="item.name" :value="item.count" :total="total" :delay="i * 0.2")
</template>

<script>
import TopChartBar from '@/components/shoppingify/statistics/TopChartBar.vue';

export default {
  name: 'TopChart',
  components: {
    TopChartBar,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    first: {
      type: Number,
    },
  },
  computed: {
    items() {
      return this.first ? this.data.slice(0, this.first) : this.data;
    },
  },
};
</script>
