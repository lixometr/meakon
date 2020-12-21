<template>
  <div>
    <Label
      label="Ограничение количества символов (Оставьте пустым для снятия ограничений)"
    >
      <NInput v-model="item.settings.limit" @input="emitData" />
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