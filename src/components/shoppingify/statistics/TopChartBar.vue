<template lang="pug">
li.top-chart__stat
  .top-chart__info
    p.top-chart__name {{ name }}
    span.top-chart__share {{ Math.round((finalValue / total) * 100) }}%
  .top-chart__chart
    progress.top-chart__progress(:value="finalValue" :max="total")
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'TopChartBar',
  props: {
    value: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    delay: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      finalValue: 0,
    };
  },
  mounted() {
    gsap.to(this.$data, { finalValue: this.value, duration: 0.8, delay: this.delay });
  },
};
</script>
