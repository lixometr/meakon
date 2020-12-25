<template>
  <component
    :is="fieldComponent"
    v-on="$listeners"
    v-bind="$attrs"
    :value="value"
    :template="template"
    ref="comp"
  />
</template>

<script>
import AInput from "@/components/AInput";
import EditImage from "@/components/EditImage";
import PageFieldInput from "./PageFieldInput"
import PageFieldTextArea from "./PageFieldTextArea"
import PageFieldSelect from "./PageFieldSelect"
import PageFieldImage from "./PageFieldImage"
import PageFieldSwitcher from './PageFieldSwitcher.vue';
import PageFieldCheckbox from './PageFieldCheckbox.vue';
import PageFieldRadio from './PageFieldRadio.vue';
import PageFieldRange from './PageFieldRange.vue';
import PageFieldRepeater from './PageFieldRepeater.vue';
import PageFieldAccordion from './PageFieldAccordion';
import PageFieldTab from './PageFieldTab.vue';
import PageFieldFile from './PageFieldFile.vue';
import PageFieldBlock from './PageFieldBlock.vue';
import PageFieldGallery from './PageFieldGallery.vue';
import PageFieldCategories from './PageFieldCategories.vue';
export default {
  props: {
    value: null,
    template: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    type() {
      return this.template.type;
    },
    fieldComponent() {
      const components = {
        text: PageFieldInput,
        textArea: PageFieldTextArea,
        select: PageFieldSelect,
        image: PageFieldImage,
        switcher: PageFieldSwitcher,
        checkbox: PageFieldCheckbox,
        radio: PageFieldRadio,
        range: PageFieldRange,
        repeater: PageFieldRepeater,
        accordion: PageFieldAccordion,
        block: PageFieldBlock,
        tab: PageFieldTab,
        file: PageFieldFile,
        gallery: PageFieldGallery,
        categories: PageFieldCategories

      };
      return components[this.type];
    },
  },
  methods: {
    validate() {
      return this.$refs.comp.validate()
    }
  }
};
</script>

<style>
</style>