<template>
  <CCard>
    <CCardHeader>{{ label }}</CCardHeader>
    <CCardBody>
      <EditComponent
        v-for="(item, idx) in items"
        :key="idx"
        v-bind="item"
        :changeValue.sync="valuesModel"
      />
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  props: {
    value: Object,
    label: {
      type: String,
      default: "Seo блок",
    },
    keyProp: {
      type: String,
      default: "seo",
    },
  },

  computed: {
    valuesModel: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    items() {
      return [
        {
          c: "AInput",
          v: `${this.keyProp}.title`,
          label: "Title",
        },
        {
          c: "AInput",
          v: `${this.keyProp}.description`,
          label: "Description",
        },
        {
          c: "AInput",
          v: "seo.keywords",
          label: "Keywords",
        },
      ];
    },
  },
};
</script>

<style>
</style>