import { computed } from 'vue';
import { useStore } from 'vuex';

export default () => {
  const store = useStore();

  const colorSchema = computed(() => store.state.colorSchema);
  const userColorSchema = localStorage.getItem('colorSchema');

  if (['light', 'dark'].includes(userColorSchema)) {
    store.dispatch('setColorSchema', userColorSchema);
  }

  const setColorSchemeClass = (e) => {
    if (colorSchema.value === 'auto') {
      if (e.matches) store.dispatch('addBodyClass', 'dark');
      else store.dispatch('removeBodyClass', 'dark');
    }
  };

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setColorSchemeClass);
  setColorSchemeClass(window.matchMedia('(prefers-color-scheme: dark)'));
};
