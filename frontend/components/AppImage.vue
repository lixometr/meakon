<template>
  <img :src="path" alt="" />
</template>

<script>
export default {
  props: {
    img: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    path() {
      if (typeof this.img === "string") {
        return this.img;
      }
      return this.img && this.img.url;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>