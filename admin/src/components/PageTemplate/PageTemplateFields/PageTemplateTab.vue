<template>
  <div>
    <AppMultiplyer v-model="item.settings.fields">
      <template v-slot:itemHeader="{ item, idx }">
        <span>{{ item.name || `Поле ${idx + 1}` }}</span>
      </template>
      <template v-slot:default="{ item: itm, idx }">
        <div>
          <AInput
            label="Название таба"
            :value="itm.name"
            @input="changeTabName(idx, $event)"
          />
          <PageTemplateFields
            class="mt-4"
            :value="itm.fields"
            @input="changeField(idx, $event)"
            ref="fields"
          ></PageTemplateFields>
        </div>
      </template>
    </AppMultiplyer>
  </div>
</template>

<script>
import PageTemplateFieldMixinVue from "./PageTemplateFieldMixin.vue";
import AppMultiplyer from "@/components/AppMultiplyer";

export default {
  mixins: [PageTemplateFieldMixinVue],
  components: {
    AppMultiplyer,
    PageTemplateFields: () =>
      import("@/components/PageTemplate/PageTemplateFields"),
  },
  created() {
    // if (!this.item.settings.fields) this.item.settings.fields = [];
  },
  methods: {
    validate() {
      const fields = this.$refs.fields;
      if (fields) {
        return this.$refs.fields.validate();
      }
      return true;
    },
    changeTabName(idx, value) {
      this.$set(this.item.settings.fields[idx], "name", value);
      this.emitData();
    },
    changeField(idx, value) {
      this.$set(this.item.settings.fields[idx], "fields", value);
      this.emitData();
    },
  },
};
</script>

<style></style>
