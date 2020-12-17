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
      <template #list-footer>
        <CButton class="w-100 mt-2" variant="outline" color="primary" @click="add">Добавить</CButton>
      </template>
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
      default: true,
    },
  },
  components: {
    SearchSelect,
  },
  methods: {
    async findItem(id) {
      const { data: item } = await this.$api.get("attributeById", { id });
      return item;
    },
    async searchItem(text, options) {
      const { data: items } = await this.$api.get("attributesSearch", {text}, {params: options});
      return items
    },
    add() {
      this.$router.push('/attributes')
    }
  },
};
</script>

<style lang="scss">
</style>