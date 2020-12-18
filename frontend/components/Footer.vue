<template>
  <footer>
    <div class="container-fluid">
      <div class="col-12 footer_info">
        <span v-html="values.leftText"></span>
        <span v-html="values.rightText"></span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      values: {},
    };
  },
  async fetch() {
    try {
      const { values } = await this.$api.$get("widgetByName", {
        name: "footer",
      });
      this.values = values;
    } catch (err) {
      this.$error(err)
    }
  },
};
</script>

<style lang="scss" >
</style>