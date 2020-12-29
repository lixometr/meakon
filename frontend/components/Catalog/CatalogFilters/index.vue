<template>
  <div>
    <CatalogFiltersPrice
      :value="price"
      @input="updatePrice"
      @apply="updatePage"
      v-if="showPrice"
    />
    <CatalogFiltersItem
      v-for="(item, idx) in attributes"
      :key="idx"
      :value="activeAttributes[item.name.slug]"
      @input="onFilterChange($event, item.name.slug)"
      :item="item"
    />
    <a class="filters_del" @click.prevent="clearFilters" href="" v-if="attributes.length > 0"
      ><span>+</span> {{ $t("clearFilters") }}</a
    >
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    showPrice: {
      type: Boolean,
      default: false,
    },
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
      return this.$store.getters["filters/attributes"] || [];
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
    onFilterChange(value, attrSlug) {
      this.$store.commit("filters/changeAttr", {
        name: attrSlug,
        value: value,
      });
      this.updatePage();
    },
    updatePrice(value) {
      this.$store.commit("filters/setPrice", value);
      this.updatePage();
    },
    getFiltersQuery() {
      const filters = this.$store.getters["filters/active"];
      let query = {};
      query.price = filters.price.join(",");
      const attributes = filters.attributes || {};
      Object.keys(attributes).map((attrSlug) => {
        const attrValues = attributes[attrSlug];
        console.log(attrValues);
        if (!attrValues || !attrValues.length) return;
        query[attrSlug] = attrValues.join(",");
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