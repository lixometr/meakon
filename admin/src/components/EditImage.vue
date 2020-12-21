<template>
  <Label :label="label" class="mb-3">
    <ImageUpload width="150px" v-bind="attrs" :value="url" v-on="listeners" />
  </Label>
</template>

<script>
import ImageUpload from "@/components/ImageUpload";
export default {
  props: {
    label: String,
    value: Object
  },
  components: {
    ImageUpload,
  },
  computed: {
    url() {
      return this.value && this.value.url || ''
    },
    attrs() {
      return {
        ...this.$attrs,
        value: this.url
      }
    },
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput
      }
    },
     horizontal() {
      return this.$store.getters.horizontal;
    },
  },
  data() {
    return {};
  },

  methods: {
    onInput(val) {
      const newValue = {...this.value}
      newValue.url = val
      this.$emit('input', newValue)
    }
  },
};
</script>

<style lang="scss" scoped>
</style>