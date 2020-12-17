<template>
  <Label :label="label" :required="required">
      <AppColorPicker v-on="$listeners" v-bind="$attrs"/>
  </Label>
</template>

<script>
import AppColorPicker from "@/components/AppColorPicker";

export default {
  props: {
    label: String,
    required: Boolean,
  },
  components: {
    AppColorPicker,
  },
};
</script>

<style>
</style>