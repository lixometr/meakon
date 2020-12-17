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
          c="ATextArea"
          v="block1.left"
          label="Левая колонка"
          :changeValue.sync="values"
          :schema="schema"
        />
        <EditComponent
          c="ATextArea"
          v="block1.right"
          label="Правая колонка"
          :changeValue.sync="values"
          :schema="schema"
        />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Блок 2</CCardHeader>
      <CCardBody>
        <EditComponent
          c="ATextArea"
          v="block2"
          label="Текст"
          :changeValue.sync="values"
        />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Блок 3</CCardHeader>
      <CCardBody>
        <EditComponent
          c="EditMultiplyer"
          v="block3"
          label=""
          :items="[
            { c: 'AInput', v: 'number', label: 'Цифра' },
            { c: 'AInput', v: 'text', label: 'Описание' },
          ]"
          :schema="schema"
          :changeValue.sync="values"
        />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Блок 4</CCardHeader>
      <CCardBody>
        <EditComponent
          c="ATextArea"
          v="block4"
          label="Текст"
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
    
  },
  methods: {
    async save() {
      return this.$api.put(
        "widgetByName",
        { name: "about_page" },
        { values: this.values }
      );
    },
    async fetchItem() {
      try {
        const { data } = await this.$api.get("widgetByNameAdmin", {
          name: "about_page",
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