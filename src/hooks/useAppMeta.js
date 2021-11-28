import { watch, computed } from 'vue';
import { useStore } from 'vuex';
import { useMeta } from 'vue-meta';

export default () => {
  const store = useStore();
  const { meta } = useMeta({
    title: '',
    htmlAttrs: { lang: 'en' },
    bodyAttrs: {
      class: '',
    },
  });

  const pageTitle = computed(() => store.state.pageTitle);
  const bodyClass = computed(() => store.state.bodyClasses.join(' '));

  watch(
    pageTitle,
    (val) => {
      meta.title = val;
    },
    { immediate: true },
  );
  watch(bodyClass, (val) => {
    meta.bodyAttrs.class = val;
  });

  const setColorSchemeClass = (e) => {
    if (e.matches) store.dispatch('addBodyClass', 'dark');
    else store.dispatch('removeBodyClass', 'dark');
  };

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setColorSchemeClass);
  setColorSchemeClass(window.matchMedia('(prefers-color-scheme: dark)'));
};
