<template>
  <div>
    <PageTemplateDefiner :value="page" :template="template" />
  </div>
</template>

<script>
import PageMixin from "@/mixins/PageMixin.js";
export default {
  mixins: [PageMixin({ slug: "home" })],
};
</script>

<style lang="scss" >
</style>