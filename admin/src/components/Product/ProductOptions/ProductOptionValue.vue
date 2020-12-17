<template>
  <div class="p-3 border-primary mb-3">
    <div class="d-flex justify-content-end mb-2">
      <CButton color="danger" @click="remove()">
        <CIcon name="cil-trash"></CIcon>
      </CButton>
    </div>
    <AInput
      label="Значение опции"
      class="mb-3"
      :value="value.name"
      @input="changeName"
    />
   
    <RegionPrice :value="value.price" @input="changePrice" />
    <ProductOptionRange :value="value.settings" @input="changeSettings" v-if="type === 'range'"/>
    <ProductOptionLine :value="value.settings" @input="changeSettings" v-if="type === 'line'"/>
  </div>
</template>

<script>
import RegionPrice from "@/components/Product/RegionPrice";
import ProductOptionRange from "@/components/Product/ProductOptions/ProductOptionRange";
import ProductOptionLine from "@/components/Product/ProductOptions/ProductOptionLine";

export default {
  props: {
    value: Object,
    type: String
  },
  components: {
    RegionPrice,
    ProductOptionRange,
    ProductOptionLine
  },
  methods: {
    remove() {
      this.$emit("delete");
    },
    changeName(name) {
      const newValue = Object.assign({}, this.value, { name });
      this.$emit("input", newValue);
    },
    changePrice(price) {
      const newValue = Object.assign({}, this.value, { price });
      this.$emit("input", newValue);
    },
    changeSettings(settings) {
      const newValue = Object.assign({}, this.value, { settings });
      this.$emit("input", newValue);
    },
    
  },
};
</script>

<style>
</style>