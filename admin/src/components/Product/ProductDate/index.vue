<template>
  <div class="product-date">
    <div class="product-date__items">
      <ProductDateItem
        class="mb-3 border p-3"
        v-for="(item, idx) in value"
        :value="item"
        :key="idx"
        @input="onItemChange($event, idx)"
        @delete="onItemDelete(idx)"
      />
    </div>
    <div class="d-flex">
      <CButton color="warning" class="w-100" @click="add"
        >Добавить дату</CButton
      >
    </div>
  </div>
</template>

<script>
import ProductDateItem from "./ProductDateItem";
export default {
  /* [ { date: '', team: 1, cnt: 1, sale: 20 } ] */
  props: {
    value: {
      type: Array,
      default: () => []
    },
  },
  components: {
    ProductDateItem,
  },
  methods: {
    add() {
      const newItem = {};
      const items = [...this.value, newItem];
      this.$emit("input", items);
    },
    onItemChange(value, idx) {
      const items = [...this.value];
      items[idx] = value;
      this.$emit("input", items);
    },
    onItemDelete(idx) {
      const items = [...this.value];
      items.splice(idx);
      this.$emit("input", items);
    },
  },
};
</script>

<style>
</style>