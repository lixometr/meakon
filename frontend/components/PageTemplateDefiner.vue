<template>
  <component :is="comp" :value="value" :template="template" />
</template>

<script>
import Home from "@/components/PageTemplates/Home"
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
    Home
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