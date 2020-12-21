<template>
  <div class="page-fields">
    <!-- <h5>Поля</h5> -->
    <CRow class="w-100 mb-2 font-bold">
      <CCol col="4"><b> Название поля</b></CCol>
      <CCol col="4"><b>Значение в коде</b></CCol>
      <CCol col="3"><b> Тип</b></CCol>
    </CRow>
    <AppMultiplyer :value="value" @input="onDragChange" :itemClass="itemClass">
      <template v-slot:itemHeader="{ idx, item }">
        <CRow class="w-100">
          <CCol col="4"> {{ item.name || `Поле ${idx}` }}</CCol>
          <CCol col="4">{{ item.var_name }}</CCol>
          <CCol col="3"> {{ item.type }}</CCol>
        </CRow>
      </template>
      <template v-slot:default="{ item, idx }">
        <PageTemplateField
          class="p-3 border mb-4"
          :value="item"
          :idx="idx + 1"
          @input="onItemChange($event, idx)"
          :ref="`field-${idx}`"
        />
      </template>
    </AppMultiplyer>
    <!-- <draggable
      class="page-fields__items"
      tag="div"
      :value="value"
      @input="onDragChange"
    >
      <PageTemplateField
        class="p-3 border mb-4"
        v-for="(item, idx) in value"
        :key="idx"
        :value="item"
        :idx="idx + 1"
        @input="onItemChange($event, idx)"
        @delete="onItemDelete(idx)"
      />
    </draggable>
    <div class="d-flex mt-3">
      <CButton color="warning" class="w-100" @click="add"
        >Добавить поле</CButton
      >
    </div> -->
  </div>
</template>

<script>
import PageTemplateField from "./PageTemplateField";
import draggable from "vuedraggable";
import AppMultiplyer from "@/components/AppMultiplyer";

export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    PageTemplateField,
    draggable,
    AppMultiplyer,
  },
  mounted() {
    this.validate();
  },
  data() {
    return {
      itemClass: [],
    };
  },
  computed: {},
  methods: {
    getFields() {
      const refs = Object.keys(this.$refs);
      const fields = refs
        .map((ref, idx) => {
          const el = this.$refs["field-" + idx];
          if (el) {
            return el;
          }
          return false;
        })
        .filter((item) => !!item);
      return fields;
    },
    validate() {
      const itemsValid = this.getFields().map((component) => {
        return component.validate();
      });
      this.itemClass = itemsValid.map((item) => ({
        "border-danger": !item,
      }));
      return !itemsValid.includes(false);
    },
    onItemChange(value, idx) {
      const items = [...this.value];
      items[idx] = value;
      this.$emit("input", items);
      this.validate();
    },
    onItemDelete(idx) {
      const items = [...this.value];
      items.splice(idx, 1);
      this.$emit("input", items);
    },
    onDragChange(value) {
      this.$emit("input", value);
    },
    add() {
      const newItem = {
        // name: "",
        // varName: "",
        // type: "",
        // settings: [],
      };
      const items = [...this.value, newItem];
      this.$emit("input", items);
    },
  },
};
</script>

<style>
</style>