<template>
  <div>
    <CRow class="mb-3">
      <CCol col="6">
        <Label label="Мин. количество изображений">
          <NInput
            :isValid="$v.item.settings.min.$error ? false : undefined"
            v-model="item.settings.min"
            @input="emitData"
          />
        </Label>
      </CCol>
      <CCol col="6">
        <Label label="Макс. количество изображений">
          <NInput
            :isValid="$v.item.settings.max.$error ? false : undefined"
            v-model="item.settings.max"
            @input="emitData"
          />
        </Label>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import PageTemplateFieldMixinVue from "./PageTemplateFieldMixin.vue";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [PageTemplateFieldMixinVue],
  computed: {},

  validations: {
    item: {
      settings: {
        max: {
          required,
        },
        min: {
          required,
        },
      },
    },
  },
  methods: {
    validate() {
      this.$v.$touch()
      return (
        !this.$v.item.settings.min.$error && !this.$v.item.settings.max.$error
      );
    },
  },
};
</script>

<style>
</style>