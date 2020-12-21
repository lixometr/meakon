<template>
  <div class="attribute-value-select">
    <SearchSelect
      :label="label"
      :value="value"
      @input="$emit('input', $event)"
      :multiple="multiple"
      :findItem="findItem"
      :searchItem="searchItem"
      class="select"
      :inputClass="inputClass"
    >
      <template #list-footer>
        <CButton class="w-100 mt-2" variant="outline" color="primary" @click="addValue">Добавить</CButton>
      </template>
    </SearchSelect>
  </div>
</template>

<script>
import AttrValueModal from "@/components/AttrValueModal";

import SearchSelect from "@/components/SearchSelect";
export default {
  props: {
    value: [String,Array],
    label: String,
    multiple: {
      type: Boolean,
      default: true
    },
    attributeId: [String, Number],
    inputClass: [String,Array,Object]
  },
  components: {
    SearchSelect,
  },
  methods: {
    async findItem(id) {
      const { data: item } = await this.$api.get("attributeValueById", { id });
      return item;
    },
    async searchItem(text, options) {
      const { data: items } = await this.$api.get("attributeByIdValues", {
        id: this.attributeId,
      }, {params: options});
      return {items};
    },
    addValue() {
      this.$modal.show(
        AttrValueModal,
        { new: true, attributeId: this.attributeId, created() {} },
        { height: "100%", width: "100%" }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.attribute-value-select {
  display: flex;
}
.select {
  flex: 1;
  margin-right: 2px;
}
.button {
  flex-shrink: 0;
}
</style>