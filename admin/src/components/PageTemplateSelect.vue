<template>
  <div>
    <SearchSelect
      :label="label"
      :value="value"
      @input="$emit('input', $event)"
      :multiple="multiple"
      :findItem="findItem"
      :searchItem="searchItem"
    >
   
    </SearchSelect>
  </div>
</template>

<script>
import SearchSelect from "@/components/SearchSelect";
export default {
  props: {
    value: [String, Array],
    label: String,
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SearchSelect,
  },
  methods: {
    async findItem(id) {
      const { data: item } = await this.$api.get("pageTemplateById", { id });
      return item;
    },
    async searchItem(text, options) {
      const { data: items } = await this.$api.get("pageTemplatesSearch", {text}, {params: options});
      return items
    },
    
  },
};
</script>

<style lang="scss">
</style>