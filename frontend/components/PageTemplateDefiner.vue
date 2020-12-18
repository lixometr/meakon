<template>
  <component :is="comp" :value="value" :template="template" />
</template>

<script>
import Templates from "@/components/PageTemplates";
export default {
  props: {
    template: {
      type: Object,
    },
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    ...Templates,
  },
  computed: {
    comp() {
      if (this.template.slug === "main") {
        return "";
      }

      let name = this.template.slug;
      return name;
    },
  },
};
</script>

<style lang="scss" >
</style>