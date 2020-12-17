<template>
  <div class="border p-3">
    <draggable class="row pl-3 pr-3" :value="items" @input="onDragChange">
      <ProductImagesItem
        v-for="(item, idx) in items"
        :key="idx"
        :url="item.url"
        :idx="idx + 1"
        @delete="itemDelete(idx)"
        @input="itemEdit($event, idx)"
        class="cursor-pointer"
      />
    </draggable>
    <div class="d-flex justify-content-center">
      <CButton color="warning" @click="add" class="float-right mt-4">
        Добавить изображение
        <CIcon class="ml-1" name="cib-addthis" />
      </CButton>
    </div>
  </div>
</template>

<script>
import ProductImagesItem from "./ProductImagesItem";
import draggable from "vuedraggable";
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ProductImagesItem,
    draggable,
  },
  beforeMount() {},

  computed: {
    items() {
      return this.value;
    },
    modalItem() {
      return this.items[this.modalItemIdx] || {};
    },
  },
  methods: {
    add() {
      const newItem = {
        url: "",
      };
      let newItems = [...this.value, newItem];
      this.$emit("input", newItems);
    },

    itemEdit(url, idx) {
      let items = [...this.value];
      items[idx] = { ...items[idx], url };
      this.$emit("input", items);
    },
    itemDelete(idx) {
      let newItems = [...this.value];
      newItems.splice(idx, 1);
      this.$emit("input", newItems);
    },

    onDragChange(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>