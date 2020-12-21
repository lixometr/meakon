<template>
  <div class="product-option">
    <div
      class="d-flex align-items-center cursor-pointer justify-content-between"
      @click="isOpen = !isOpen"
    >
      <span>Опция {{ idx }}</span>
      <CButton color="danger" @click="remove">
        <CIcon name="cil-trash"></CIcon>
      </CButton>
    </div>
    <CCollapse class="pt-3" :show="isOpen">
      <CRow alignVertical="center">
        <CCol col="6">
          <AInput label="Название опции" v-model="item.name" />
        </CCol>
        <CCol col="6">
          <v-select
            placeholder="Выберите тип поля"
            :multiple="false"
            v-model="item.type"
            :options="types"
            label="label"
            :reduce="(item) => item.key"
            :searchable="false"
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol col="6"
          ><AInput class="mt-3" label="Подсказка" v-model="item.description"
        /></CCol>
      </CRow>
      <CRow v-if="item.type === 'line'">
        <CCol col="6"
          ><AInput
            class="mt-3"
            label="Ярлык возле значения"
            v-model="item.settings.tooltip"
        /></CCol>
      </CRow>
      <CRow v-if="item.type === 'range'">
        <CCol col="6"
          ><AInput
            class="mt-3"
            label="Ярлык возле левого значения"
            v-model="item.settings.tooltip1"
          />
        </CCol>
        <CCol col="6"
          ><AInput
            class="mt-3"
            label="Ярлык возле правого значения"
            v-model="item.settings.tooltip2"
        /></CCol>
      </CRow>
      <div class="mt-3">
        <draggable tag="div" :value="item.values" @input="onDragChange">
          <ProductOptionValue
            v-for="(val, idx) in item.values"
            :key="idx"
            :value="val"
            :type="item.type"
            @input="changeValue($event, idx)"
            @delete="onValueDelete(idx)"
          />
        </draggable>
        <div class="d-flex">
          <CButton color="primary" @click="addValue">Добавить значение</CButton>
        </div>
      </div>
    </CCollapse>
  </div>
</template>

<script>
import _ from "lodash";
import ProductOptionValue from "./ProductOptionValue";
import draggable from "vuedraggable";

export default {
  props: {
    value: Object,
    idx: Number,
  },
  data() {
    return {
      isOpen: false,
      item: _.cloneDeep(this.value),
    };
  },
  components: {
    ProductOptionValue,
    draggable,
  },
  computed: {
    types() {
      return [
        {
          label: "Чекбокс",
          key: "checkbox",
        },
        {
          label: "Радио кнопки",
          key: "radio",
        },
        {
          label: "Селект",
          key: "select",
        },
        {
          label: "Табы",
          key: "tab",
        },
        {
          label: "Лайн",
          key: "line",
        },
        {
          label: "Диапазон",
          key: "range",
        },
      ];
    },
  },
  created() {
    if (!this.item.settings) this.$set(this.item, 'settings', {});
  },
  methods: {
    onDragChange(value) {
      this.$set(this.item, "values", value);
    },
    onValueDelete(idx) {
      this.item.values = this.item.values.filter((val, index) => index !== idx);
    },
    changeValue(value, idx) {
      this.$set(this.item.values, idx, value);
    },
    remove() {
      this.$emit("delete");
    },
    addValue() {
      this.item.values.push({
        price: [],
        name: "",
      });
    },
  },
  watch: {
    item: {
      deep: true,
      handler() {
        this.$emit("input", this.item);
      },
    },
  },
};
</script>

<style>
</style>