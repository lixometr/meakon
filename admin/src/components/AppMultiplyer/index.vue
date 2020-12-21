<template>
  <div class="app-multiplyer">
    <draggable
      class="app-multiplyer__items"
      tag="div"
      :value="value"
      @input="onDragChange"
    >
      <AppMultiplyerItem
        :itemClass="itemClass[idx]"
        v-for="(item, idx) in value"
        :key="idx"
        :idx="idx"
        @input="onItemChange($event, idx)"
        @delete="onItemDelete(idx)"
      >
        <template v-slot:itemHeader="slotData"
          ><slot name="itemHeader" v-bind="{ ...slotData, item, idx }"></slot
        ></template>
        <slot v-bind="{ item, idx }"></slot>
      </AppMultiplyerItem>
    </draggable>
    <div class="mt-3">
      <div @click="add">
        <slot name="addBtn">
          <CButton color="warning" class="d-block w-100">{{ addText }}</CButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import AppMultiplyerItem from "./AppMultiplyerItem.vue";

export default {
  props: {
    addText: {
      type: String,
      default: "Добавить поле",
    },
    itemClass: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    draggable,
    AppMultiplyerItem,
  },
  methods: {
    // onItemChange(value, idx) {
    //   const items = [...this.value];
    //   items[idx] = value;
    //   this.$emit("input", items);
    // },
    onItemDelete(idx) {
      const items = [...this.value];
      items.splice(idx, 1);
      this.$emit("input", items);
    },
    onDragChange(value) {
      this.$emit("input", value);
    },
    add() {
      const newItem = {};
      const items = [...this.value, newItem];
      this.$emit("input", items);
    },
  },
};
</script>

<style>
</style>