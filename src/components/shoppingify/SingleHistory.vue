<template lang="pug">
section.single-history(v-if="products")
  .single-history__back
   router-link.single-history__back-link(:to="{ name: 'shoppingify-history' }")
    span.material-icons keyboard_backspace
    |
    | Back
  header.single-history__header
    h1.single-history__title
      span {{ title }}
      span.single-history__status(:class="`single-history__status--${status}`") {{ status }}
    time.single-history__time(:datetime="datetime") {{ date }}
  products-list.single-history__products-list(mode="history" :products="products" :categories="categories")
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Message from '@/utils/Message';

import api from '@/api';

import ProductsList from '@/components/shoppingify/ProductsList.vue';

export default {
  name: 'ShoppingifyHome',
  components: {
    ProductsList,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const products = ref(null);
    const categories = ref(null);
    const title = ref('');
    const date = ref('');
    const datetime = ref('');
    const status = ref('');

    api.shoppingify
      .mySingleShoppingHistory(route.params.id)
      .then((res) => {
        const data = res.data.data.mySingleShoppingHistory;
        const shoppingDate = new Date(Number(data.updatedAt));

        title.value = data.name;
        status.value = data.state;

        date.value = shoppingDate.toLocaleString('en-GB', {
          weekday: 'short',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        datetime.value = `${shoppingDate.getFullYear()}-${(shoppingDate.getMonth() + 1)
          .toString()
          .padStart(2, 0)}-${shoppingDate.getDate().toString().padStart(2, 0)}`;

        categories.value = data.products.reduce((cats, product) => {
          const { category } = product.product;
          // eslint-disable-next-line no-underscore-dangle
          const exists = cats.find((c) => c._id === category._id);
          if (!exists) cats.push(category);

          return cats;
        }, []);

        products.value = data.products;
      })
      .catch((err) => {
        store.dispatch('addMessage', new Message(err.message, 'error'));
      });

    // prettier-ignore
    return {
      title,
      status,
      date,
      datetime,
      products,
      categories,
    };
  },
};
</script>
