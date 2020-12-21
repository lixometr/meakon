<template>
  <SearchSelect
    :value="value"
    :label="label"
    @input="$emit('input', $event)"
    :multiple="multiple"
    :findItem="findItem"
    :searchItem="searchItem"
    :required="required"
  >
  <template #list-footer>
    <CButton color="primary" variant="outline" class="w-100 mt-2" @click="createTag">Добавить тег</CButton>
  </template>
  </SearchSelect>
</template>

<script>
import SearchSelect from "@/components/SearchSelect";
import EditSectionTag from "@/components/Modals/EditSectionTag"
export default {
  props: {
    value: [String, Array],
    multiple: {
      type: Boolean,
      default: true,
    },
    label: String,
    required: Boolean,
  },
  components: {
    SearchSelect,
  },
  data() {
    return {};
  },

  methods: {
    createTag() {
      this.$modal.show(EditSectionTag, {}, {width: '100%', height: '100%'})
    },
    async findItem(id) {
      const { data: tag } = await this.$api.get("sectionTagById", { id });

      return { ...tag };
    },
    async searchItem(text, options) {
      const { data: tags } = await this.$api.get(
        "sectionTagsSearch",
        { text },
        { params: options }
      );
      return tags;
    },
  },
};
</script>

<style lang="scss">
</style>