<template>
  <div>
    <PageTemplateDefiner :template="template" :value="page" />
  </div>
</template>
<script> 
import PageMixin from "@/mixins/PageMixin.js";
export default {
  mixins: [PageMixin()],
};
</script>


<style lang="scss" >
</style>