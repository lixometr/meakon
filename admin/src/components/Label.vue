<template>
  <div class="form-row align-items-center">
    <CCol :class="horizontal.label" v-if="label">
      <slot name="label">
        <span class="label-label">{{label}} <span class="text-danger" v-if="required">*</span></span>
      </slot>
    </CCol>
    <CCol :class="{[horizontal.input]: label, [horizontal.input]: !canFull}">
      <slot></slot>
    </CCol>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: String,
    canFull: Boolean,
    required: Boolean,
  },

  computed: {
    horizontal() {
      return this.$store.getters.horizontal;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>