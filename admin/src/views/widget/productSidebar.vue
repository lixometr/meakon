<template>
  <div v-if="!$store.getters.isLoading">

    <CCard>
      <CCardHeader>Элементы</CCardHeader>
      <CCardBody>
        <EditComponent
          c="EditMultiplyer"
          v="items"
          label="Items"
          :items="items"
          :changeValue.sync="values"
          :schema="schema"
          
        />
     
      </CCardBody>
    </CCard>
    
    
  </div>
</template>

<script>
import AInput from "@/components/AInput";
import EditImage from "@/components/EditImage";

import merge from "lodash.merge";
export default {
  data() {
    return {
      values: {},
      schema: {},
    };
  },

  components: {
    AInput,
    EditImage,
  },
  async created() {
    this.$loading.start();
    await this.fetchItem();
    this.$loading.stop();
  },
  computed: {
    items() {
      return [
        {
          c: "AInput",
          v: "title",
          label: "Заголовок блока",
        },
        {
          c: "AInput",
          v: "sub_title",
          label: "Подзаголовок блока",
        },
        {
          c: "AInput",
          v: "description",
          label: "Описание",
        },
        
      ]
    }
   
  },
  methods: {
    async save() {
      return this.$api.put("widgetByName", { name: "product_sidebar" }, {values: this.values});
    },
    async fetchItem() {
      try {
        const { data } = await this.$api.get("widgetByNameAdmin", {
          name: "product_sidebar",
        });
        const values = data.values;
        this.schema = data.schema || {};
        this.values = merge({}, this.values, values);
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>