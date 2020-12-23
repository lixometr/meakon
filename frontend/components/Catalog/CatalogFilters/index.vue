<template>
  <div>
    <CatalogFiltersPrice
      :value="price"
      @input="updatePrice"
      @apply="updatePage"
    />
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
import _ from "lodash";
export default {
  props: {
    // items: {
    //   type: Array,
    //   default: () => [],
    // },
  },
  data() {
    return {
      updatePage: _.throttle(this._updatePage, 300),
    };
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
      this.$store.commit("filters/changeAttr", { name: attrId, value: value });
      this.updatePage();
    },
    updatePrice(value) {
      this.$store.commit("filters/setPrice", value);
      this.updatePage();
    },
    getFiltersQuery() {
      const slugFilters = this.$store.getters["filters/slugFilters"];
      let query = {};
      query.price = slugFilters.price.join(",");
      slugFilters.attributes.map((attr) => {
        query[attr.name] = attr.value.join(",");
      });
      return query;
    },
    _updatePage() {
      let query = { page: 1, ...this.getFiltersQuery() };

      this.$router.push({
        query,
      });
    },
    clearFilters() {
      this.$store.dispatch("filters/clear");
      let query = { page: 1 };

      this.$router.push({
        query,
      });
    },
  },
};
</script>

<style lang="scss" >
</style>