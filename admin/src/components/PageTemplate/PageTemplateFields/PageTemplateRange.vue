<template>
  <div class="page-template-text">
    <CRow class="mb-3">
      <CCol col="6">
        <Label label="Миниммальное значение">
          <NInput
            :isValid="$v.item.settings.min.$error ? false : undefined"
            v-model="item.settings.min"
            @input="emitData"
          />
        </Label>
      </CCol>
      <CCol col="6">
        <Label label="Максимальное значение">
          <NInput
            :isValid="$v.item.settings.max.$error ? false : undefined"
            v-model="item.settings.max"
            @input="emitData"
          />
        </Label>
      </CCol>
    </CRow>
    <Label label="Шаг">
      <NInput
        :isValid="$v.item.settings.step.$error ? false : undefined"
        v-model="item.settings.step"
        @input="emitData"
      />
    </Label>
  </div>
</template>

<script>
import PageTemplateFieldMixin from "./PageTemplateFieldMixin";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [PageTemplateFieldMixin],
  validations: {
    item: {
      settings: {
        max: {
          required,
        },
        min: {
          required,
        },
        step: {
          required,
        },
      },
    },
  },
  methods: {
    validate() {
      this.$v.$touch();
      return !this.$v.$error;
    },
  },
};
</script>

<style>
</style>