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
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    view: String,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" >
</style>