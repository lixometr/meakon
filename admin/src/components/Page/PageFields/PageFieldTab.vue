<template>
  <div>
    <i>{{template.var_name}}</i>
    <CTabs variant="tabs" class="p-2" :active-tab="0">
      <CTab
        :title="tab.name"
        v-for="(tab, index) in settings.fields"
        :key="index"
      >
        <div class="pt-3 border-left border-right border-bottom">
          <PageField
            :template="templateItem"
            :value="objValue[templateItem.var_name]"
            @input="onFieldChange(templateItem.var_name, $event)"
            v-for="(templateItem, idx) in tab.fields"
            :key="idx"
            :ref="`field-${index}`"
          />
        </div>
      </CTab>
    </CTabs>
  </div>
</template>

<script>
// value: [ {var_name1: '', var_name2: '} ]
// template: {settings: {fields: [ {name: '', var_name1: '', type: ''}, {var_name2: ''} ]  }
import Mixin from "./PageFieldMixin";
import AppMultiplyer from "@/components/AppMultiplyer";
export default {
  mixins: [Mixin],
  components: {
    AppMultiplyer,
    PageField: () => import("./PageField"),
  },
  computed: {
    fields() {
      return this.settings.fields || [];
    },
  },
  created() {},
  methods: {
    getFields() {
      const refs = Object.keys(this.$refs);
      const fields = refs
        .filter((item) => item.indexOf("field-") === 0)
        .map((ref) => this.$refs[ref])
        .reduce((arr, item) => arr.concat(item), []);
      return fields;
    },
    validate() {
      const itemsValid = this.getFields().map((component) => {
        return component.validate();
      });
      return !itemsValid.includes(false);
    },
    onInput(value) {
      this.emitData(value);
    },
    onFieldChange(varName, newValue) {
      const value = { ...this.objValue };
      value[varName] = newValue;
      this.$emit("input", value);
    },
  },
};
</script>

<style></style>
