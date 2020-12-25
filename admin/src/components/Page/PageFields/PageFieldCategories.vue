<template>
  <Label label=" ">
    <template v-slot:label>
      <div>{{ label }}</div>
      <div class="page-field-var-name">
        <i>{{ varName }}</i>
      </div>
    </template>
    <template v-slot:default>
      <CategorySelect
        :multiple="true"
        :value="arrValue"
        @input="emitData"
      />
    </template>
  </Label>
</template>



<script>
import CategorySelect from "@/components/CategorySelect";

import Mixin from "./PageFieldMixin";

export default {
 
  mixins: [Mixin],
  methods: {},
  components: {
    CategorySelect
  }
};
</script>

<style>
</style>