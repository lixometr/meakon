<template>
  <Label label=" ">
    <template v-slot:label>
      <div>{{ label }}</div>
      <div class="page-field-var-name">
        <i>{{ varName }}</i>
      </div>
    </template>
    <CInputCheckbox
      custom
      :checked="value || settings.default"
      @update:checked="emitData"
    />
  </Label>
</template>



<script>
import Mixin from "./PageFieldMixin";
export default {
  mixins: [Mixin],
};
</script>

<style>
</style>