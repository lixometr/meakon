<template>
  <Label :label="label" :required="required" class="a-checkbox">
    <CInputCheckbox custom class="mb-0" :value="value" :checked.sync="inpValue" />
  </Label>
</template>

<script>
export default {
  props: {
    label: String,

    value: Boolean,
    required: Boolean,
  },
  components: {},

  computed: {
      inpValue: {
          get() {
              return this.value
          },
          set(val) {
              this.$emit('input', val)
          }
      },
    horizontal() {
      return this.$store.getters.horizontal;
    },
  },
  methods: {
    changeValue(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>