<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <!-- <CCardHeader></CCardHeader> -->
      <CCardBody>
        <EditComponent
          c="AInput"
          v="logo"
          label="Логотип"
          :changeValue.sync="values"
          :schema="schema"
        />
        <EditComponent
          c="EditImage"
          v="bg_image"
          label="Изображение на фоне"
          :changeValue.sync="values"
          :schema="schema"
        />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Меню 1</CCardHeader>
      <CCardBody>
        <EditComponent
          c="AInput"
          v="menu1.title"
          label="Заголовок меню"
          :changeValue.sync="values"
          :schema="schema"
        />
        <EditComponent
          c="EditMultiplyer"
          v="menu1.items"
          :items="menuItems"
          label="Ссылки в меню"
          :changeValue.sync="values"
          :schema="schema"
        />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Menu 2</CCardHeader>
      <CCardBody>
        <EditComponent
          c="AInput"
          v="menu2.title"
          label="Заголовок меню"
          :changeValue.sync="values"
          :schema="schema"
        />
        <EditComponent
          c="EditMultiplyer"
          v="menu2.items"
          :items="menuItems"
          label="Ссылки в меню"
          :changeValue.sync="values"
          :schema="schema"
        />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Menu 3</CCardHeader>
      <CCardBody>
        <EditComponent
          c="AInput"
          v="menu3.title"
          label="Заголовок меню"
          :changeValue.sync="values"
          :schema="schema"
        />
        <EditComponent
          c="EditMultiplyer"
          v="menu3.items"
          :items="menuItems"
          label="Ссылки в меню"
          :changeValue.sync="values"
          :schema="schema"
        />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Копирайт</CCardHeader>
      <CCardBody>
         <EditComponent
          c="AInput"
          v="copyright1"
          label="Копирайт 1"
          :changeValue.sync="values"
        />
         <EditComponent
          c="AInput"
          v="copyright2"
          label="Копирайт 2"
          :changeValue.sync="values"
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
    menuItems() {
      return [
        {
          c: "AInput",
          v: "title",
          label: "Заголовок",
        },
        {
          c: "AInput",
          v: "url",
          label: "Ссылка",
        },
       
        {
          c: "EditImage",
          v: "icon",
          label: "Иконка",
        },
      ];
    },
   
  },
  methods: {
    async save() {
      return this.$api.put("widgetByName", { name: "footer" }, {values: this.values});
    },
    async fetchItem() {
      try {
        const { data } = await this.$api.get("widgetByNameAdmin", {
          name: "footer",
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