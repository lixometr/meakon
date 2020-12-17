<template>
  <CInput v-bind="attrs" v-on="listeners" />
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    float: Boolean
  },
  computed: {
    attrs() {
      return {
        type: "number",
        ...this.$attrs,
      };
    },
    listeners() {
      return { ...this.$listeners, change: this.onInput };
    },
  },
  methods: {
    onInput(value) {
      let numValue;
      if(this.float) {
        numValue = parseFloat(value);

      } else {
        numValue = parseInt(value);
      }
      if (isNaN(numValue)) {
        numValue = 0;
      }
      this.$emit("input", numValue);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>