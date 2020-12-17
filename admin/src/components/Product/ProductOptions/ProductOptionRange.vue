<template>
  <div class="product-option-range">
    <Label label="Диапазон:" class="mb-3"></Label>
    <CRow>
      <CCol col="6">
        <Label label="От">
          <NInput v-model="item.from" />
        </Label>
      </CCol>
      <CCol col="6">
        <Label label="До">
          <NInput v-model="item.to" />
        </Label>
      </CCol>
    </CRow>
    <Label label="Шаг">
      <NInput v-model="item.step" />
    </Label>
  </div>
</template>

<script>
import NInput from "@/components/NInput";
export default {
  props: {
    value: Object,
  },
  components: {
    NInput,
  },
  data() {
    return {
      item: this.value || {},
    };
  },
  watch: {
      item() {
          this.$emit('input', this.item)
      }
  }
};
</script>

<style>
</style>