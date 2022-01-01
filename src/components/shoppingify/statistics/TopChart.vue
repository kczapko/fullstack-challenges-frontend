<template lang="pug">
section.top-chart
  h2.top-chart__title {{ title }}
  ul.top-chart__stats
    li.top-chart__stat(v-for="item in items")
      .top-chart__info
        p.top-chart__name {{ item.name }}
        span.top-chart__share {{ Math.round((item.count / total) * 100) }}%
      .top-chart__chart
        progress.top-chart__progress(:value="item.count" :max="total")
</template>

<script>
export default {
  name: 'TopChart',
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
