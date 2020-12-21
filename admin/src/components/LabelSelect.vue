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
import LabelModal from "@/components/Modals/LabelModal"
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
      const { data: item } = await this.$api.get("labelById", { id });
      return item;
    },
    async searchItem(text, options) {
      const { data: items } = await this.$api.get("labelsSearch", {text}, {params: options});
      return items
    },
    add() {
      this.$modal.show(LabelModal, {new: true}, {width: '100%', height: '100%', adaptive: true})
    }
  },
};
</script>

<style lang="scss">
</style>