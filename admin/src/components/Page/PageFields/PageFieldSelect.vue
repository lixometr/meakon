<template>
  <Label label=" ">
    <template v-slot:label>
      <div>{{ label }}</div>
      <div class="page-field-var-name">
        <i>{{ varName }}</i>
      </div>
    </template>
    <v-select
      placeholder="Выберите вариант"
      :multiple="settings.multiple"
      :value="value"
      label="value"
      :reduce="(item) => item.var_name"
      :options="settings.options || []"
      @input="emitData"
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