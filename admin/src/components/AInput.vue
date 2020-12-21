<template>
  <Label :label="label" :required="required" class="t-input">
    <CInput
      :isValid="isValid"
      class="mb-0"
      :description="description"
      :value="value"
      v-on="$listeners"
      @input="$emit('input', $event)"
    />
  </Label>
</template>

<script>
export default {
  props: {
    label: String,
    isValid: {
      type: Boolean,
      default: undefined
    },
    description: String,

    value: String,
    required: Boolean,
  },
  components: {},

  computed: {
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