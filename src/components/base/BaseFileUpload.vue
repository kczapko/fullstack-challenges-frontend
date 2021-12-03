<template lang="pug">
.file-upload
  p.file-upload__error(v-if="error") {{ error }}
  input.file-upload__input(type="file" name="files" @change="submit" :multiple="multiple" :accept="accept" ref="input")
  .file-upload__dropzone(
    :class="{'file-upload__dropzone--over' : overDropZone}"
    @dragenter="overDropZone = true"
    @dragleave="overDropZone = false"
    @dragover.prevent="overDropZone = true"
    @drop="submit")
    span.file-upload__dropzone-text.text-gray Drag and Drop {{ multiple ? 'Files' : 'File' }}
    span.file-upload__dropzone-text.text-gray Or
    a.file-upload__dropzone-link(href="#" @click.prevent="onBrowseFileClick") Browse files
  .file-upload__progress(v-if="progress")
    progress(max="1" :value="progress")
</template>

<script>
import axios from '@/api/axios';

export default {
  name: 'BaseFileUpload',
  props: {
    url: {
      type: String,
      required: true,
    },
    accept: {
      type: String,
      default: 'image/jpg,image/jpeg,image/png,image/webp',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 1024 * 1024,
    },
    onError: Function,
    onSuccess: Function,
  },
  emits: ['error', 'success'],
  data() {
    return {
      overDropZone: false,
      error: '',
      progress: 0,
    };
  },
  methods: {
    onBrowseFileClick() {
      this.$refs.input.click();
    },
    async submit(e) {
      e.preventDefault();
      this.error = '';
      this.overDropZone = false;
      this.progress = 0;

      const errors = [];
      let files = [...(e.dataTransfer ? e.dataTransfer.files : e.target.files)];

      if (this.accept) {
        const accept = this.accept.split(',');
        files = files.filter((file) => {
          const allowed = accept.some((type) => file.type === type);
          if (!allowed) errors.push(`File ${file.name} is wrong type. Skipping it.`);
          return allowed;
        });
      }

      if (this.size) {
        files = files.filter((file) => {
          const allowed = file.size <= this.size;
          if (!allowed) errors.push(`File ${file.name} is too big. Skipping it.`);
          return allowed;
        });
      }

      if (errors.length) {
        if (!this.$props.onError) this.error = errors.join('\n');
        else this.$emit('error', errors);
      }
      if (!files.length) return;
      if (!this.multiple) files = [files[0]];

      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));

      try {
        const res = await axios.post(this.url, formData, {
          onUploadProgress: (progressEvent) => {
            this.progress = progressEvent.loaded / progressEvent.total;
          },
        });
        this.$emit('success', res.data);
      } catch (err) {
        if (!this.$props.onError) this.error = err.message;
        else this.$emit('error', [err.message]);
      }
    },
  },
};
</script>
