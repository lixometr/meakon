<template>
  <div>
    {{ $store.getters['filters/active'] }}
    {{activeAttributes}}
    <CatalogFiltersPrice :value="price" @input="updatePrice" />
    <CatalogFiltersItem
      v-for="(item, idx) in attributes"
      :key="idx"
      :value="activeAttributes[item.name._id]"
      @input="onFilterChange($event, item.name._id)"
      :item="item"
    />
    <a class="filters_del" @click.prevent="clearFilters" href=""
      ><span>+</span> {{ $t("clearFilters") }}</a
    >
  </div>
</template>

<script>
export default {
  props: {
    // items: {
    //   type: Array,
    //   default: () => [],
    // },
  },
  data() {
    return {};
  },
  computed: {
    price() {
      return this.$store.getters["filters/price"];
    },
    attributes() {
      return this.$store.getters["filters/attributes"];
    },
    activeFilters() {
      return this.$store.getters["filters/active"];
    },
    activeAttributes() {
      return this.$store.getters["filters/activeAttributes"];
    },
    filterPrice() {
      // return this.$store.getters["filters/price"];
    },
    activeFiltersSlug() {
      return this.$store.getters["filters/slugFilters"];
    },
  },
  methods: {
    // [ attrValId  ]
    onFilterChange(value, attrId) {
      console.log('change!', value, attrId)
      this.$store.commit("filters/changeAttr", { name: attrId, value: value });
    },
    updatePrice(value) {
      this.$store.commit("filters/setPrice", value);
    },
    updatePage() {
      let query = { ...this.$route.query, page: 1 };

      this.$router.push({
        query,
      });
    },
    clearFilters() {
      this.$store.dispatch("filters/clear");
    },
  },
};
</script>

<style lang="scss" >
</style>