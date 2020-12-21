<template>
  <div class="product-variations pt-4 pb-4">
    <h6>Вариации:</h6>
    <div class="product-variations__items">
      <ProductVariation
        v-for="(variation, idx) in value"
        :key="idx"
        :idx="idx + 1"
        :value="variation"
        @input="onItemChange($event, idx)"
        @delete="onDelete(idx)"
      />
    </div>
    <div class="d-flex mb-2">
      <CButton color="warning" class="w-100" @click="add"
        >Добавить вариацию</CButton
      >
    </div>
    <hr />
  </div>
</template>

<script>
import ProductVariation from "@/components/Product/ProductVariation";
export default {
  /* [{variation}] */
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ProductVariation,
  },
  methods: {
    add() {
      const items = [...this.value];
      const newItem = {
        price: [],
        old_price: [],
        product_options: [],
        date: [],
      };
      const newItems = [...items, newItem];
      this.$emit("input", newItems);
    },
    onDelete(idx) {
      const items = [...this.value];
      items.splice(idx, 1);
      this.$emit("input", items);
    },
    onItemChange(value, idx) {
      const items = [...this.value];
      items[idx] = value;
      this.$emit("input", items);
    },
  },
};
</script>

<style>
</style>