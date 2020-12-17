<template>
  <div class="product-date__item">
    <div class="d-flex justify-content-end mb-2">
      <CButton color="danger" @click="remove()">
        <CIcon name="cil-trash"></CIcon>
      </CButton>
    </div>
    <Label label="Дата" class="mb-3">
     <ProductDatePicker v-model="item.date"/>
    </Label>
    
    <Label class="mb-3" label="Команда" >
      <CInputRadioGroup
        :checked.sync="item.team"
        :options="teamOptions"
        custom
        
      />
    </Label>
    <Label label="Количество">
      <NInput v-model="item.cnt" />
    </Label>
    <Label label="Скидка (%)">
      <NInput v-model="item.sale" />
    </Label>
  </div>
</template>

<script>
import ProductDatePicker from "./ProductDatePicker"
import NInput from "@/components/NInput";
export default {
  props: {
    value: Object,
  },
  
  data() {
    return {
      item: this.value,
      teamOptions: [
        {
          value: "1",
          label: "Команда красных",
        },
        {
          value: "2",
          label: "Команда синих",
        },
      ],
    };
  },
 
  components: {
    NInput,
    ProductDatePicker
  },
  methods: {
    remove() {
      this.$emit("delete");
    },
  },
  watch: {
    item: {
      deep: true,
      handler() {
        this.$emit("input", this.item);
      },
    },
  },
};
</script>

<style>
</style>