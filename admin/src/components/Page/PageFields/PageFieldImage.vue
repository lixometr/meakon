<template>
  <Label label=" ">
    <template v-slot:label>
      <div>{{ label }}</div>
      <div class="page-field-var-name">
        <i>{{ varName }}</i>
      </div>
    </template>
    <template v-slot:default>
      <EditImage :value="value" @input="onChange" />
    </template>
  </Label>
</template>



<script>
import Mixin from "./PageFieldMixin";
import EditImage from "@/components/EditImage";
export default {
  mixins: [Mixin],
  components: {
    EditImage,
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