<template lang="pug">
section.statistics(v-if="statistics")
  header.statistics__header
    h1.statistics__title Statistics {{ statistics.length ? `for ${statistics[0].stats.currentYear}` : '' }}
  p.statistics__empty(v-if="statistics.length === 0") Yout don't have any shopping history to generate statistics.
  .statistics__body(v-else)
    top-chart.statistics__top-chart.statistics__top-chart--products(
      title="Top Products"
      :data="statistics[0].stats.products"
      :total="statistics[0].stats.total"
      :first="3")
    top-chart.statistics__top-chart.statistics__top-chart--categories(
      title="Top Categories"
      :data="statistics[0].stats.categories"
      :total="statistics[0].stats.total"
      :first="3")
    line-chart.statistics__line-chart.statistics__line-chart--monthly(
      title="Monthly Summary"
      :data="statistics[0].stats.monthly"
      :labels="monthNames")
    line-chart.statistics__line-chart.statistics__line-chart--daily(
      :title="`Daily Summary for ${monthNames[statistics[0].stats.currentMonth]}`"
      :data="statistics[0].stats.daily"
      :labels="dayLabels")
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

import Message from '@/utils/Message';

import api from '@/api';

import TopChart from '@/components/shoppingify/statistics/TopChart.vue';
import LineChart from '@/components/shoppingify/statistics/LineChart.vue';

export default {
  name: 'ShoppingStatistics',
  components: {
    TopChart,
    LineChart,
  },
  setup() {
    const store = useStore();

    const statistics = ref(null);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const dayLabels = ref([]);

    /* Temporary block = not working on production */
    // api.shoppingify
    //   .myShoppingStatistics()
    //   .then((res) => {
    //     const data = JSON.parse(res.data.data.myShoppingStatistics);

    //     if (data.length) {
    //       for (let i = 0; i < data[0].stats.daily.length; i += 1) {
    //         dayLabels.value.push(i + 1);
    //       }
    //     }

    //     statistics.value = data;
    //   })
    //   .catch((err) => {
    //     store.dispatch('addMessage', new Message(err.message, 'error'));
    //   });

    api.shoppingify
      .myShoppingStatistics()
      .then((res) => {
        const data = JSON.parse(res.data.data.myShoppingStatistics);

        if (data && data.stats.length) {
          const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          const currentDate = new Date(data.currentDate);
          const { currentMonth, currentYear } = data;

          const state = {
            currentDate,
            currentYear,
            currentMonth,
            products: [],
            categories: [],
            monthly: Array(12).fill(0),
            daily: Array(daysInMonth[currentMonth]).fill(0),
            total: 0,
          };

          data.stats.forEach((s) => {
            const prod = state.products.find((p) => p.name === s.product[0].name);
            if (prod) prod.count += s.products.quantity;
            else {
              state.products.push({
                name: s.product[0].name,
                count: s.products.quantity,
              });
            }

            const cat = state.categories.find((c) => c.name === s.category[0].name);
            if (cat) cat.count += s.products.quantity;
            else {
              state.categories.push({
                name: s.category[0].name,
                count: s.products.quantity,
              });
            }

            const date = new Date(s.updatedAt);
            const month = date.getMonth();
            const day = date.getDate();
            // eslint-disable-next-line no-param-reassign
            state.monthly[month] += s.products.quantity;
            // eslint-disable-next-line no-param-reassign
            if (month === state.currentMonth) state.daily[day - 1] += s.products.quantity;

            // eslint-disable-next-line no-param-reassign
            state.total += s.products.quantity;
          });

          for (let i = 0; i < state.daily.length; i += 1) {
            dayLabels.value.push(i + 1);
          }

          statistics.value = [{ stats: state }];
        } else {
          statistics.value = data;
        }
      })
      .catch((err) => {
        store.dispatch('addMessage', new Message(err.message, 'error'));
      });

    return { statistics, monthNames, dayLabels };
  },
};
</script>
