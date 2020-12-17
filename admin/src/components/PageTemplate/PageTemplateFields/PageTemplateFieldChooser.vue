<template>
  <component
    :is="fieldComponent"
    v-on="$listeners"
    v-bind="$attrs"
    :value="value"
    ref="comp"
  />
</template>

<script>
import PageTemplateText from "./PageTemplateText";
import PageTemplateTextArea from "./PageTemplateTextArea";
import PageTemplateRange from "./PageTemplateRange";
import PageTemplateImage from "./PageTemplateImage.vue";
import PageTemplateSelect from "./PageTemplateSelect";
import PageTemplateCheckbox from "./PageTemplateCheckbox";
import PageTemplateRadio from "./PageTemplateRadio";
import PageTemplateSwitcher from "./PageTemplateSwitcher.vue";
import PageTemplateRepeater from "./PageTemplateRepeater.vue";
import PageTemplateAccordion from "./PageTemplateAccordion.vue";
import PageTemplateTab from "./PageTemplateTab.vue";
import PageTemplateGallery from "./PageTemplateGallery.vue";
import PageTemplateBlock from "./PageTemplateBlock.vue";
export default {
  props: {
    value: null,
    type: {
      type: String,
    },
  },
  // components: {
  //   PageTemplateText,
  // },
  computed: {
    fieldComponent() {
      const components = {
        text: PageTemplateText,
        textArea: PageTemplateTextArea,
        range: PageTemplateRange,
        image: PageTemplateImage,
        select: PageTemplateSelect,
        checkbox: PageTemplateCheckbox,
        radio: PageTemplateRadio,
        switcher: PageTemplateSwitcher,
        repeater: PageTemplateRepeater,
        accordion: PageTemplateAccordion,
        tab: PageTemplateTab,
        gallery: PageTemplateGallery,
        block: PageTemplateBlock,
      };
      return components[this.type];
    },
  },
  methods: {
    validate() {
      const c = this.$refs.comp;
      if (c) {
        return this.$refs.comp.validate();
      }
      return true;
    },
  },
};
</script>

<style>
</style>