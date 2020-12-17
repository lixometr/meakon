<template>
  <div class="product-attributes ">
    <ProductAttributeItem
      v-for="(attr, idx) in value"
      :key="idx"
      :item="attr"
      @input="changeAttr($event, idx)"
      @delete="attrDelete(idx)"
      class="mb-3 product-attributes__item"
    />
    <div class="d-flex mt-2 justify-content-center">
      <CButton color="warning" @click="addAttr">Добавить атрибут</CButton>
    </div>
  </div>
</template>

<script>
import ProductAttributeItem from "./ProductAttributeItem";
export default {
  /**
   * [
   *  {
   *      show: true,
   *      value: ['']
   *      name: ''
   *  }
   * ]
   */
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ProductAttributeItem,
  },

  methods: {
    attrDelete(idx) {
      const items = [...this.value];
      items.splice(idx, 1);
      this.$emit("input", items);
    },
    changeAttr(newValue, idx) {
      const items = [...this.value];
      items[idx] = newValue;
      this.$emit("input", items);
    },

    addAttr() {
      const newItem = { show: true, value: [], name: "" };
      const items = [...this.value, newItem];
      this.$emit("input", items);
    },
  },
};
</script>

<style lang="scss" scoped>
.product-attributes {
  &__item {
    &:last-child {
      margin-bottom: 0;
    }
    margin-bottom: 20px;
  }
}
</style>