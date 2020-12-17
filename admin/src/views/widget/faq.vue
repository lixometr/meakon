<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <!-- <CCardHeader></CCardHeader> -->
      <CCardBody>
        <EditComponent
          c="AInput"
          v="title"
          label="Заголовок страницы"
          :changeValue.sync="values"
          :schema="schema"
        />
       
      </CCardBody>
    </CCard>
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
    <SeoEdit v-model="values"/>
    
    
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
          c: "EditMultiplyer",
          v: "items",
          label: "Элементы",
          items: [
            {
              c: "AInput",
              label: "Заголовок",
              v: "title"
            },
            {
              c: "AInput",
              label: "Текст",
              v: "text"
            },
          ]
        }
      ]
    }
   
  },
  methods: {
    async save() {
      return this.$api.put("widgetByName", { name: "faq" }, {values: this.values});
    },
    async fetchItem() {
      try {
        const { data } = await this.$api.get("widgetByNameAdmin", {
          name: "faq",
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