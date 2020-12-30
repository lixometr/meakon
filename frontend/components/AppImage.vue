<template>
  <img :src="path" alt="" />
</template>

<script>
export default {
  props: {
    img: {
      type: [Object, String],
      default: () => ({}),
    },
    holder: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    path() {
      if (typeof this.img === "string") {
        return this.img;
      }
      let url = this.img && this.img.url
      if(!url && this.holder) {
        url = this.$store.getters['defaultImage']
      }
      return url;
    },
  },
};
</script>

<style lang="scss" >
</style>