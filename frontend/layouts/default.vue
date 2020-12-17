<template>
  <div class="">
    <Header />
    <div class="main-content">
      <Nuxt />
    </div>
    <!-- <Modal /> -->
    <Footer />
  </div>
</template>
<script>
export default {
  mounted() {
    this.checkModal();
  },
  methods: {
    checkModal() {
      const modal = this.$route.query.modal;
    },
  },
  watch: {
    "$route.query"() {
      this.checkModal();
    },
  },
};
</script>
<style>
</style>
