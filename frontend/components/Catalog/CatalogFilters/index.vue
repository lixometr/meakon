<template>
  <div>
    <CatalogFiltersPrice />
    <CatalogFiltersItem v-for="(item, idx) in items" :key="idx" :item="item" />
    <a class="filters_del" @click.prevent="clearFilters" href=""
      ><span>+</span> Очистить все фильтры</a
    >
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    clearFilters() {

    },
  },
};
</script>

<style lang="scss" >
</style>