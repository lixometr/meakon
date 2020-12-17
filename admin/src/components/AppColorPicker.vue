<template>
  <div>
    <ColorPicker v-model="color" />
  </div>
</template>

<script>
import { Chrome } from "vue-color";

export default {
  props: {
    value: null,
  },
  data() {
    return {
      color: this.value || '',
    };
  },
  components: {
    ColorPicker: Chrome,
  },
  watch: {
    
    color() {
      if (!this.color) return;
      const color = this.color.hex
      this.$emit('input', color)
    },
  },
};
</script>

<style lang="scss" scoped>
</style>