<template>
  <div>
    <div class="border">
      <div class="p-3 cursor-pointer" @click="toggle">
        {{ label }} ({{template.var_name}})
      </div>
      <CCollapse class="" :show="isOpen">
        <div class="p-4">
          <PageFieldAccordionItem
            v-for="(item, idx) in settings.fields"
            :item="item"
            :value="objValue"
            @input="onFieldChange"
            :key="idx"
            class="mb-2"
            ref="fields"
          />
        </div>
      </CCollapse>
    </div>
  </div>
</template>

<script>
// value: [ {var_name1: '', var_name2: '} ]
// template: {settings: {fields: [ {name: '', var_name1: '', type: ''}, {var_name2: ''} ]  }
import Mixin from "../PageFieldMixin";
import AppMultiplyer from "@/components/AppMultiplyer";
import PageFieldAccordionItem from "./PageFieldAccordionItem";
export default {
  mixins: [Mixin],
  components: {
    AppMultiplyer,
    PageFieldAccordionItem,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    fields() {
      return this.settings.fields || [];
    },
  },

  methods: {
    getFields() {
      return this.$refs.fields;
    },
    validate() {
      const itemsValid = this.getFields().map((component) => {
        return component.validate();
      });
      return !itemsValid.includes(false);
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
    onInput(value) {
      this.emitData(value);
    },
    onFieldChange({ var_name, value }) {
      const val = { ...this.objValue };
      val[var_name] = value;
      this.$emit("input", val);
    },
  },
};
</script>

<style></style>
