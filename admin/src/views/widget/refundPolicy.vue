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
      <CCardBody>
        <EditComponent
          c="ATextArea"
          v="content"
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
  },
  async created() {
    this.$loading.start();
    await this.fetchItem();
    this.$loading.stop();
  },
  computed: {},
  methods: {
    async save() {
      return this.$api.put(
        "widgetByName",
        { name: "refund_policy" },
        { values: this.values }
      );
    },
    async fetchItem() {
      try {
        const { data } = await this.$api.get("widgetByNameAdmin", {
          name: "refund_policy",
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