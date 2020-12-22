<template>
  <div class="col-lg-3 col-md-6 col-sm-12 filter">
    <details open="">
      <!-- <details open> -->
      <summary>&nbsp;</summary>

      <ul class="filter_tabs">
        <CatalogSidbarSearch />

        <CatalogSidebarCategories :items="categories" />

        <CatalogFilters :items="filterItems" />
      </ul>
    </details>
  </div>
</template>

<script>
export default {
  props: {},
  computed: {
    filterItems() {},
    categories() {},
  },
};
</script>

<style lang="scss" >
</style>