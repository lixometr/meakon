<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <!-- <CCardHeader></CCardHeader> -->
      <CCardBody>
        <EditComponent
          c="AInput"
          v="leftText"
          label="Текст слева"
          :changeValue.sync="values"
          :schema="schema"
        />
        <EditComponent
          c="AInput"
          v="leftText_en"
          label="EN Текст слева"
          :changeValue.sync="values"
          :schema="schema"
        />
        <EditComponent
          c="AInput"
          v="rightText"
          label="Текст справа"
          :changeValue.sync="values"
          :schema="schema"
        />
        <EditComponent
          c="AInput"
          v="rightText_en"
          label="EN Текст справа"
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
   
  },
  methods: {
    async save() {
      return this.$api.put(
        "widgetByName",
        { name: "footer" },
        { values: this.values }
      );
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