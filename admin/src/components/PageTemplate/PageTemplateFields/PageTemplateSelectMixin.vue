<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      itemClass: [],
    };
  },
  methods: {
    getFields() {
      const refs = Object.keys(this.$refs);
      const fields = refs
        .map((ref, idx) => {
          const el = this.$refs["item-" + idx];
          if (el) {
            return el;
          }
          return false;
        })
        .filter((item) => !!item);
      return fields;
    },
    validate() {
      const itemsValid = this.getFields().map((component) => {
        return component.validate();
      });
      this.itemClass = itemsValid.map((item) => ({
        "border-danger": !item,
      }));
      return !itemsValid.includes(false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>