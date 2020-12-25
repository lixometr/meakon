<template>
 <div class="col-lg-3 d-lg-block filter "> 
      <ul class="filter_tabs" :class="{showed: showSidebar, hidden: !showSidebar}">
        <CatalogSidebarSearch />

        <CatalogSidebarCategories  />

        <CatalogFilters :items="filterItems" v-if="showFilters" />
      </ul>
  </div>
</template>

<script>
export default {
  props: {
    showFilters: {
      type: Boolean,
      default: true,
    },
    // filters: {
    //   type: Object,
    //   default: () => ({})
    // }
  },
  computed: {
    showSidebar() {
      return this.$store.getters.showFiltersSidebar
    },
    filterItems() {},
    categories() {},
  },
};
</script>

<style lang="scss" >
</style>