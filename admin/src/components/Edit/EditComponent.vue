<template>
  <div class="mb-3">
    <component :is="c" v-bind="attrs" v-on="listeners"></component>
  </div>
</template>

<script>
import _ from "lodash";
import AInput from "@/components/AInput";
import EditImage from "@/components/EditImage";
import EditMultiplyer from "@/components/Edit/EditMultiplyer";
import EditOffset from "@/components/Edit/EditOffset";
import EditColor from "@/components/Edit/EditColor"
import NInput from "@/components/NInput"
export default {
  props: {
    changeValue: null,
    c: String,
    v: String,
    label: String,
    schema: [Object, Array],
  },
  components: {
    EditMultiplyer,
    AInput,
    EditImage,
    EditOffset,
    EditColor,
    NInput
  },
  computed: {
    cValue() {
      return _.get(this.changeValue, this.v);
    },
    cSchema() {
      return _.get(this.schema, this.v);
    },
    attrs() {
      return {
        ...this.$attrs,
        label: this.label,
        value: this.cValue,
        c: this.c,
        v: this.v,
        schema: this.schema,
        changeValue: this.changeValue,
      };
    },
    listeners() {
      return {
        ...this.$listeners,
        input: (value) => {
          this.onChangeValue(value);
        },
      };
    },
  },
  methods: {
    onChangeValue(val) {
      let newValue = val;
      const clonedValue = _.cloneDeep(this.changeValue);
      newValue = _.set(clonedValue, this.v, newValue);
      this.$emit("update:changeValue", newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>