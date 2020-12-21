<template>
  <div>
    <AppMultiplyer
      class="pt-4"
      v-model="optionsModel"
      :itemClass="itemClass"
      addText="Добавить вариант"
    >
      <template v-slot:itemHeader="{ idx }">
        <span>{{ optionsModel[idx].value || `Вариант ${idx + 1}` }}</span>
      </template>
      <template v-slot:default="{ idx }">
        <PageTemplateSelectItem
          @input="emitData"
          v-model="item.settings.options[idx]"
          :ref="`item-${idx}`"
        />
      </template>
    </AppMultiplyer>
  </div>
</template>

<script>
import AppMultiplyer from "@/components/AppMultiplyer";
import AppMultiplyerItem from "@/components/AppMultiplyer/AppMultiplyerItem";
import PageTemplateFieldMixinVue from "@/components/PageTemplate/PageTemplateFields/PageTemplateFieldMixin.vue";
import PageTemplateSelectItem from "@/components/PageTemplate/PageTemplateFields/PageTemplateSelectItem";
import PageFieldSelectMixin from "@/components/PageTemplate/PageTemplateFields/PageTemplateSelectMixin"
export default {
  mixins: [PageTemplateFieldMixinVue, PageFieldSelectMixin],
  components: {
    AppMultiplyerItem,
    AppMultiplyer,
    PageTemplateSelectItem,
  },
  data() {
    return {
    }
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