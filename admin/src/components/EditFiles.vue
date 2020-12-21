<template>
  <div class="edit-files">
    <div v-for="(file, idx) in files" :key="file._id">
      <div>
        <EditFile v-model="files[idx]" />
      </div>
      <div class="d-flex">
        <CButton color="danger" @click="removeFile(file._id)">
          <CIcon name="cil-trash"></CIcon>
        </CButton>
      </div>
    </div>
    <CButton alignHorizontal="end" color="warning" @click="addFile">Добавить файл</CButton>
  </div>
</template>

<script>
import EditFile from "@/components/EditFile";
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    EditFile,
  },
  data() {
    return {
      files: this.value,
    };
  },
  methods: {
    addFile() {
        this.files.push({})
    },
    removeFile(id) {
        this.files = this.files.filter(file => file._id !== id)
        this.$emit('input', this.files)
    }
  },
  watch: {
    value() {
      this.files = this.value;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>