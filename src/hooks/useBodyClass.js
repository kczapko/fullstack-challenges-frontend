import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default (className) => {
  const store = useStore();

  onMounted(() => {
    store.dispatch('addBodyClass', className);
  });

  onUnmounted(() => {
    store.dispatch('removeBodyClass', className);
  });
};
