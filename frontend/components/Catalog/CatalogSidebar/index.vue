<template>
  <div class="col-lg-3 col-md-6 col-sm-12 filter">
    <details open="">
      <!-- <details open> -->
      <summary>&nbsp;</summary>

      <ul class="filter_tabs">
        <CatalogSidebarSearch />

        <CatalogSidebarCategories />

        <CatalogFilters :items="filterItems" />
      </ul>
    </details>
  </div>
</template>

<script>
export default {
  props: {
    // filters: {
    //   type: Object,
    //   default: () => ({})
    // }
  },
  computed: {
    filterItems() {},
    categories() {},
  },
};
</script>

<style lang="scss" >
</style>