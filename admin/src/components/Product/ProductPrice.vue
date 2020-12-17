<template>
  <div class="product-price border py-3 px-4">
    <h6 class="pb-2">Цена</h6>
    <Label label="Выберите регион">
      <v-select
        :multiple="false"
        v-model="activeRegionId"
        :options="regionOptions"
        label="name"
        :reduce="(item) => item._id"
        :searchable="false"
      />
    </Label>
    <div
      class="mt-3 border border-primary p-3"
      v-for="(item, idx) in items"
      :key="idx"
    >
      <div class="d-flex justify-content-between align-items-center mb-2">
        <b>
          {{ regionById(item.price.region).name }}
        </b>
        <CButton color="danger" @click="removePrice(item.price.region)">
          <CIcon name="cil-trash"></CIcon>
        </CButton>
      </div>
      <div>
        <Label label="Старая цена" class="">
          <NInput
            :value="item.oldPrice.value"
            @input="onChangeOldPrice($event, item.oldPrice.region)"
          />
        </Label>
        <Label  label="Новая цена" class="mt-1">
          <NInput
            :value="item.price.value"
            @input="onChangePrice($event, item.price.region)"
          />
        </Label>
      </div>
    </div>
    <CButton class="mt-3 w-100" color="primary" @click="addPrice"
      >Добавить цену</CButton
    >
  </div>
</template>

<script>
import NInput from "@/components/NInput";
export default {
  // [{value: 100, region: 1}]
  props: {
    price: Array,
    oldPrice: Array,
  },
  data() {
    return {
      activeRegionId: "",
    };
  },
  components: {
    NInput,
  },
  computed: {
    regionById() {
      return (id) => this.regions.find((reg) => reg._id === id) || {};
    },
    items() {
      const items = this.activeRegions.map((region) => {
        let regionPrice = this.price.find((p) => p.region === region) || {};
        if (!regionPrice) {
          regionPrice = {
            value: "",
            region,
          };
        }
        let regionOldPrice =
          this.oldPrice.find((p) => p.region === region) || {};
        if (!regionOldPrice) {
          regionOldPrice = {
            value: "",
            region,
          };
        }
        return {
          price: regionPrice,
          oldPrice: regionOldPrice,
        };
      });
      return items;
    },
    activeRegions() {
      const pRegions = this.price.map((p) => p.region);
      const oldPRegions = this.oldPrice.map((p) => p.region);
      const allRegions = [].concat(pRegions, oldPRegions);
      const activeRegions = allRegions.filter(
        (region, index) => allRegions.indexOf(region) === index
      );
      return activeRegions;
    },

    activeRegion() {
      return this.regions.find((reg) => reg._id === this.activeRegionId);
    },
    regionOptions() {
      const arr = this.regions.filter((region) => {
        return !this.activeRegions.includes(region._id);
      });
      return arr;
    },
    regions() {
      return this.$store.getters["region/regions"];
    },
  },
  methods: {
    removePrice(region) {
      const prices = this.price.filter((p) => p.region !== region);
      const oldPrices = this.oldPrice.filter((p) => p.region !== region);

      this.$emit("update:price", prices);
      this.$emit("update:oldPrice", oldPrices);
    },
    addPrice() {
      if (!this.activeRegionId) return;
      const priceIdx = this.price.findIndex(
        (p) => p.region === this.activeRegionId
      );
      const oldPriceIdx = this.oldPrice.findIndex(
        (p) => p.region === this.activeRegionId
      );
      let prices = [...this.price];
      let oldPrices = [...this.oldPrice];
      if (priceIdx < 0) {
        prices.push({ value: "", region: this.activeRegionId });
        this.$emit("update:price", prices);
      }
      if (oldPriceIdx < 0) {
        oldPrices.push({ value: "", region: this.activeRegionId });
        this.$emit("update:oldPrice", oldPrices);
      }
      this.activeRegionId = "";
    },
    onChangePrice(value, region) {
      const prices = [...this.price];
      const pIdx = prices.findIndex((p) => p.region === region);
      const newItem = { region, value };
      if (pIdx < 0) {
        prices.push(newItem);
      } else {
        prices[pIdx] = newItem;
      }
      this.$emit("update:price", prices);
    },
    onChangeOldPrice(value, region) {
      const oldPrices = [...this.oldPrice];
      const pIdx = oldPrices.findIndex((p) => p.region === region);
      const newItem = { region, value };
      if (pIdx < 0) {
        oldPrices.push(newItem);
      } else {
        oldPrices[pIdx] = newItem;
      }
      this.$emit("update:oldPrice", oldPrices);
    },
  },
};
</script>

<style>
</style>