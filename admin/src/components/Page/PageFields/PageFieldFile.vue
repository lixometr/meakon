<template>
  <Label label=" ">
    <template v-slot:label>
      <div>{{ label }}</div>
      <div class="page-field-var-name">
        <i>{{ varName }}</i>
      </div>
    </template>
    <template v-slot:default>
      <EditFile :value="value" @input="onChange" />
    </template>
  </Label>
</template>



<script>
import Mixin from "./PageFieldMixin";
import EditFile from "@/components/EditFile";
export default {
  mixins: [Mixin],
  components: {
    EditFile,
  },
  computed: {},
  methods: {
    onChange(link) {
      console.log("on hcange", link);
      this.emitData(link);
    },
  },
};
</script>

<style>
</style>