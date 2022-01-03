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
};
