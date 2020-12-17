<template>
  <div>
    <Label label="Значение по умолчанию">
      <CInputCheckbox
        custom
        :checked.sync="item.settings.default"
        @update:checked="emitData"
      />
    </Label>
  </div>
</template>

<script>
import PageTemplateFieldMixinVue from "./PageTemplateFieldMixin.vue";
export default {
  mixins: [PageTemplateFieldMixinVue],
};
</script>

<style>
</style>