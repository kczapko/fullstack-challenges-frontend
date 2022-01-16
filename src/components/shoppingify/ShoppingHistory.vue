<template lang="pug">
section.history(v-if="history")
  header.history__header
    h1.history__title Shopping History
  p.history__empty(v-if="history.size === 0") Yout don't have any shopping history yet.
  template(v-else)
    section.history__section(v-for="entries in history")
      h2.history__section-title.font-500
        time.history__section-time(:datetime="entries[1].datetime") {{ entries[0] }}
      ul.history__list
        li.history__list-item(v-for="item in entries[1].items")
          router-link.history__entry(:to="{ name: 'shoppingify-single-history', params: { id: item.id } }")
            span.history__entry-name {{ item.name }}
            time.history__entry-date(:datetime="item.datetime") {{ item.date }}
            span.history__entry-status(:class="`history__entry-status--${item.status}`") {{ item.status }}
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { DateTime } from 'luxon';

import Message from '@/utils/Message';

import api from '@/api';

export default {
  name: 'ShoppingHistory',
  setup() {
    const store = useStore();
    const history = ref(null);

    api.shoppingify
      .myShoppingHistory()
      .then((res) => {
        const items = res.data.data.myShoppingHistory;
        const data = new Map();

        items.forEach((item) => {
          const date = DateTime.fromMillis(Number(item.updatedAt)).setLocale('en-GB');
          const dateText = date.toFormat('LLLL yyyy');

          let entry = data.get(dateText);
          if (!entry) {
            data.set(dateText, {
              datetime: date.toFormat('yyyy-LL'),
              items: [],
            });
            entry = data.get(dateText);
          }

          entry.items.push({
            date: date.toFormat('ccc, dd/LL/yyyy'),
            datetime: date.toFormat('yyyy-LL-dd'),
            status: item.state,
            name: item.name,
            // eslint-disable-next-line no-underscore-dangle
            id: item._id,
          });
        });

        history.value = data;
      })
      .catch((err) => {
        store.dispatch('addMessage', new Message(err.message, 'error'));
      });

    return { history };
  },
};
</script>
