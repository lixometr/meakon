<template>
  <div>
    <EditComponent
      :changeValue.sync="data"
      c="EditMultiplyer"
      v="fields"
      :schema="schema"
      :items="items"
    />
  </div>
</template>

<script>
import EditComponent from "@/components/Edit/EditComponent";
import { cloneDeep } from "lodash";
export default {
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      data: cloneDeep(this.value),
    };
  },
  computed: {
    schema() {
      return {
        fields: [{
            
        }],
      };
    },
    items() {
      return [
        {
          c: "AInput",
          v: "anchor",
          label: "Якорь",
        },
        {
          c: "ATextArea",
          v: "text",
          label: "Текст",
        },
      ];
    },
  },
  components: {
    EditComponent,
  },
  watch: {
    data() {
      this.$emit("input", this.data);
    },
  },
};
</script>

<style>
</style>