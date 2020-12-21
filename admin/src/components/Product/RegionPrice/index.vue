<template>
  <div class="product-option__price">
    <div v-for="(region, idx) in regions" :key="idx">
      <RegionPriceItem
        :region="region"
        :value="priceValue(region._id)"
        @input="onInput($event, idx)"
      />
    </div>
  </div>
</template>

<script>
import RegionPriceItem from "./RegionPriceItem";
/** [ { region: '', value: '' } ] */
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    RegionPriceItem,
  },
  computed: {
    priceValue() {
      return (regId) => {
        let activeValue = this.value.find((p) => p.region === regId);
        if (!activeValue) {
          activeValue = {};
        }
        return activeValue.value;
      };
    },
    regions() {
      return this.$store.getters["region/regions"];
    },
  },
  methods: {
    remove() {
      this.$emit("delete");
    },
    onInput(value, idx) {
      const items = [...this.value];
      items[idx] = value;
      this.$emit("input", items);
    },
  },
};
</script>

<style>
</style>