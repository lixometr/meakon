<template>
  <div>
    <Label label="Выбрать несколько значений?" class="mt-3">
      <CInputCheckbox
        custom
        :checked.sync="item.settings.multiple"
        @update:checked="emitData"
      />
    </Label>
    <AppMultiplyer
      class="pt-4"
      v-model="optionsModel"
      addText="Добавить значение"
    >
      <template v-slot:itemHeader="{ idx }">
        <span>{{ optionsModel[idx].value || `Значение ${idx + 1}` }}</span>
      </template>
      <template v-slot:default="{ idx }">
        <PageTemplateSelectItem
          @input="onInput"
          v-model="optionsModel[idx]"
          :ref="`item-${idx}`"
        />
      </template>
    </AppMultiplyer>
  </div>
</template>

<script>
import AppMultiplyer from "@/components/AppMultiplyer";
import AppMultiplyerItem from "@/components/AppMultiplyer/AppMultiplyerItem";
import PageTemplateFieldMixinVue from "./PageTemplateFieldMixin.vue";
import PageTemplateSelectItem from "@/components/PageTemplate/PageTemplateFields/PageTemplateSelectItem";
import PageFieldSelectMixin from "@/components/PageTemplate/PageTemplateFields/PageTemplateSelectMixin"

export default {
  mixins: [PageTemplateFieldMixinVue, PageFieldSelectMixin],
  components: {
    AppMultiplyerItem,
    AppMultiplyer,
    PageTemplateSelectItem,
  },
  computed: {
    optionsModel: {
      get() {
        return this.item.settings.options || [];
      },
      set(value) {
        this.$set(this.item.settings, "options", value);
        this.emitData();
      },
    },
  },
  methods: {
    onInput() {
      this.emitData();
    },
  },
};
</script>

<style>
</style>