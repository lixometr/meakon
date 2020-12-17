<template>
  <div class="product-date-picker">
    <div class="mb-3 d-flex" v-for="region in regions" :key="region._id">
      <Label :label="region.name">
        <DatePicker
          :value="itemValue(region._id)"
          @input="onChange($event, region._id)"
          :show-second="false"
          type="datetime"
        ></DatePicker>
      </Label>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    DatePicker,
  },
  mounted() {
    // console.log(this.itemValue());
  },
  computed: {
    itemValue() {
      return (regionId) => {
        const item = this.value.find((v) => v.region === regionId);
        if (item) {
          let val = new Date(item.value);
          val = new Date(
            val.toLocaleString("en-US", {
              timeZone: "Europe/Moscow",
            })
          );
          // console.log(val);
          return val;
        } else {
          return;
        }
      };
    },
    regions() {
      return this.$store.getters["region/regions"];
    },
  },
  methods: {
    onChange(value, regionId) {
      const items = [...this.value];
      const valIdx = this.value.findIndex((v) => v.region === regionId);
      const newItem = {
        region: regionId,
        value,
      };
      if (valIdx < 0) {
        items.push(newItem);
      } else {
        items[valIdx] = newItem;
      }
      this.$emit("input", items);
    },
  },
};
</script>

<style>
</style>