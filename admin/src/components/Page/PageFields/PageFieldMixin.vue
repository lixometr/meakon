<template></template>

<script>
export default {
  props: {
    template: {
      type: Object,
      default: () => ({}),
    },
    value: null,
  },

  data() {
    return {};
  },
  computed: {
    objValue() {
      return this.value || {};
    },
    arrValue() {
      return this.value || [];
    },
    label() {
      return this.template.name;
    },
    required() {
      return this.template.required;
    },
    varName() {
      return this.template.var_name;
    },
    settings() {
      return this.template.settings || {};
    },
  },
  methods: {
    validate() {
      if (this.required) {
        if (this.value === false || this.value === 0) {
        } else {
          if (!this.value) {
            return false;
          }
        }
      }
      return true;
    },
    emitData(value) {
      this.$emit("input", value);
    },
  },
  watch: {},
};
</script>

<style>
</style>