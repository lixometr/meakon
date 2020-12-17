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
      <CCardHeader>Блок 1</CCardHeader>
      <CCardBody>
         <EditComponent
          c="AInput"
          v="block1.title"
          label="Заголовок"
          :changeValue.sync="values"
        />
        <EditComponent
          c="EditMultiplyer"
          v="block1.items"
          label="Items"
          :items="items"
          :changeValue.sync="values"
          :schema="schema"
        />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Блок 2</CCardHeader>
      <CCardBody>
        
        <EditComponent
          c="AInput"
          v="block2.title"
          label="Заголовок"
          :changeValue.sync="values"
        />
        <EditComponent
          c="EditMultiplyer"
          v="block2.items"
          label="Items"
          :items="items"
          :changeValue.sync="values"
          :schema="schema"
        />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Блок 3</CCardHeader>
      <CCardBody>
        
        <EditComponent
          c="AInput"
          v="block3.title"
          label="Заголовок"
          :changeValue.sync="values"
        />

      </CCardBody>
    </CCard>
    <SeoEdit v-model="values" />
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
          label: "Заголовок",
        },

        {
          c: "AInput",
          v: "sub_title",
          label: "Подзаголовок",
        },
        {
          c: "AInput",
          v: "link",
          label: "Ссылка",
        },

        {
          c: "EditImage",
          v: "icon",
          label: "Иконка",
        },
        {
          c: "EditColor",
          v: "color",
          label: "Цвет"
        }
      ];
    },
  },
  methods: {
    async save() {
      return this.$api.put(
        "widgetByName",
        { name: "contact_page" },
        { values: this.values }
      );
    },
    async fetchItem() {
      try {
        const { data } = await this.$api.get("widgetByNameAdmin", {
          name: "contact_page",
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