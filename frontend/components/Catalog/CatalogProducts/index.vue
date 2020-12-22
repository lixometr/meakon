<template>
  <div
    class="col-lg-9 col-md-6 col-sm-12 product"
    :class="{ list: view === 'list', grid: view === 'grid' }"
  >
    <CatalogProduct
      v-for="product in items"
      :key="product._id"
      :item="product"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // list grid
      view: "list",
    };
  },
  items: {
    type: Array,
    default: () => [],
  },
};
</script>

<style lang="scss" >
</style>