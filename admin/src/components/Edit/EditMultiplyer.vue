<template>
  <div class="edit-multiplyer border p-3">
    <h6>{{ label }}</h6>
    <div>
      <div
        class="edit-multiplyer__item border border-primary p-3 mb-3 position-relative"
        v-for="(cItem, idx) in cValue"
        :key="idx"
      >
        <div class="edit-multiplyer__actions d-flex justify-content-end mb-3">
          <div class="edit-multiplyer__remove">
            <CButton color="danger" @click="removeItem(idx)"
              ><CIcon name="cil-trash"
            /></CButton>
          </div>
        </div>
        <EditComponent
          class="mb-3"
          :changeValue="cItem"
          :schema="cSchema[0]"
          @update:changeValue="onUpdate($event, idx)"
          v-for="(item, index) in items"
          :key="index"
          v-bind="item"
        />
      </div>
    </div>
    <CButton class="w-100" align="end" color="warning" @click="addItem"
      >Добавить блок</CButton
    >
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    value: null,
    v: String,
    label: String,
    items: {
      type: Array,
      default: () => [],
    },
    schema: [Object, Array],
    changeValue: null,
  },
  components: {
    EditComponent: () => import("@/components/Edit/EditComponent"),
  },
  computed: {
    cValue() {
      let arr = _.get(this.changeValue, this.v) || [];

      return arr;
    },
    cSchema() {
      return _.get(this.schema, this.v);
    },
  },
  data() {
    return {};
  },
  methods: {
    removeItem(idx) {
      let newItems = [...this.value];
      newItems.splice(idx, 1);
      this.$emit("input", newItems);
    },
    addItem() {
      console.log("adding item", this.schema, this.v, this.cSchema);
      const newItem = this.cSchema[0];
      let newValue = [...this.value, newItem];
      this.$emit("input", newValue);
    },
    onUpdate(newValue, idx) {
      const clonedItems = _.cloneDeep(this.cValue);
      clonedItems[idx] = newValue;
      this.$emit("input", clonedItems);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>