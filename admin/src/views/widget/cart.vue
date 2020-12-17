<template>
  <div v-if="!$store.getters.isLoading">
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
  computed: {},
  methods: {
    async save() {
      return this.$api.put(
        "widgetByName",
        { name: "cart_page" },
        { values: this.values }
      );
    },
    async fetchItem() {
      try {
        const { data } = await this.$api.get("widgetByNameAdmin", {
          name: "cart_page",
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