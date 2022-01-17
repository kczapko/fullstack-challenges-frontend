<template lang="pug">
section.line-chart
  h2.line-chart__title {{ title }}
  .line-chart__chart
    canvas(ref="canvas")
</template>

<script>
// prettier-ignore
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export default {
  name: 'LineChart',
  data() {
    return {
      chart: null,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.chart = new Chart(this.$refs.canvas, {
      options: {
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            displayColors: false,
          },
        },
      },
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            fill: false,
            borderColor: '#f9a20b',
            tension: 0.3,
          },
        ],
      },
    });
  },
  beforeUnmount() {
    // this.chart.destroy();
  },
};
</script>
