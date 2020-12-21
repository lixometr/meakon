<template>
  <div>
    <CategorySelect :multiple="true" :value="value" @input="onChange" />
  </div>
</template>

<script>
import CategorySelect from "@/components/CategorySelect";
export default {
  props: {
    value: [Array,String],
  },
  components: {
    CategorySelect,
  },
  methods: {
    onChange(newValue) {
        this.$emit('input', newValue)
    },
  },
};
</script>

<style lang="scss" scoped>
</style>