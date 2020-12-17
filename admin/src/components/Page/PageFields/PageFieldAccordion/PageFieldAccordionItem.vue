<template>
  <div class="border">
    <div class="p-3 cursor-pointer" @click="isOpen = !isOpen">
      {{ item.name }}
    </div>
    <CCollapse class="" :show="isOpen">
      <div class="pt-4 pr-4">
        <div class="mt-3">
          <PageField
            :template="templateItem"
            :value="value[templateItem.var_name]"
            @input="onFieldChange(templateItem.var_name, $event)"
            v-for="(templateItem, idx) in item.fields"
            :key="idx"
            ref="fields"
          />
        </div>
      </div>
    </CCollapse>
  </div>
</template>

<script>
export default {
  components: {
    PageField: () => import("../PageField"),
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    getFields() {
      return this.$refs.fields || [];
    },
    validate() {
      const itemsValid = this.getFields().map((component) => {
        return component.validate();
      });
      return !itemsValid.includes(false);
    },
    onFieldChange(var_name, value) {
      this.$emit("input", { var_name, value });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>