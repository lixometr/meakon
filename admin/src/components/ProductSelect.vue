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
        <template v-slot:option="option">
        <slot name="option" v-bind="option">
          <div class="d-center">{{ option.full_name }}</div>
        </slot>
      </template>
      <template v-slot:selected-option="option">
        <slot name="selected-option" v-bind="option">
          <div class="selected d-center">{{ option.full_name }}</div>
        </slot>
      </template></SearchSelect>
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
      default: true,
    },
  },
  components: {
    SearchSelect,
  },
  methods: {
    async findItem(id) {
      const { data: item } = await this.$api.get("productById", { id });
      return item;
    },
    async searchItem(text, options) {
      try { 
        const { data: items } = await this.$api.get("productsSearch", { text }, {params: options});
        return items
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>