<template>
  <Label :label="label" class="mb-3">
    <FileUpload width="150px" v-bind="$attrs" v-on="$listeners" />
  </Label>
</template>

<script>
import FileUpload from "@/components/FileUpload";
export default {
  props: {
    label: String,
  },
  components: {
    FileUpload,
  },
  data() {
    return {};
  },
  computed: {
    horizontal() {
      return this.$store.getters.horizontal;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>