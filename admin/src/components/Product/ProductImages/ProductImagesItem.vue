<template>
  <div class="col-3 py-2 border px-4 d-flex flex-column">
    <div class="image-wrapper p-2 rounded flex-1 ">
      <ImageUpload :value="url" @input="onImageChange" />
    </div>
    <div class="actions mt-auto d-flex justify-content-center">
      <CButton color="danger" class="delete" @click="onDelete">
        <CIcon name="cil-trash"></CIcon>
      </CButton>
    </div>
  </div>
</template>

<script>
import ImageUpload from "@/components/ImageUpload";
export default {
  props: {
    url: String,
  },
  components: {
    ImageUpload,
  },
  methods: {
    onDelete() {
      this.$emit("delete");
    },
    onImageChange(newVal) {
      this.$emit("input", newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>