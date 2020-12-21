<template>
  <div>
    <PageTemplateFields
      v-model="item.settings.fields"
      @input="emitData"
      ref="fields"
    ></PageTemplateFields>
  </div>
</template>

<script>
import PageTemplateFieldMixinVue from "./PageTemplateFieldMixin.vue";
export default {
  mixins: [PageTemplateFieldMixinVue],
  components: {
    PageTemplateFields: () =>
      import("@/components/PageTemplate/PageTemplateFields"),
  },
  methods: {
    validate() {
      const fields = this.$refs.fields;
      if (fields) {
        return this.$refs.fields.validate();
      }
      return true;
    },
  },
  created() {
    // if (!this.item.settings.fields) this.item.settings.fields = [];
  },
};
</script>

<style>
</style>