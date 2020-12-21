<template>
  <div class="porduct-option__price-item">
    <Label :label="region.currency">
      <!-- <div class="mr-2">{{  }}</div> -->
      <NInput :value="value" @input="onInput" />
    </Label>
  </div>
</template>

<script>
import NInput from "@/components/NInput";
export default {
  props: {
    value: [String, Number],
    region: Object,
  },
  components: {
    NInput,
  },
  methods: {
    onInput(value) {
        const item = {
            region: this.region._id,
            value
        }
      this.$emit("input", item);
    },
  },
};
</script>

<style>
</style>