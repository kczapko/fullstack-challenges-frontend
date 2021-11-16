<template>
  <div>Auth page {{ action }}</div>
</template>

<script>
import { useMeta } from 'vue-meta';

export default {
  name: 'Auth',
  props: {
    action: {
      type: String,
      required: true,
      validator(val) {
        return ['login', 'signup'].includes(val);
      },
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    useMeta({
      title: props.title,
    });
  },
};
</script>
