<template>
  <div>
    <div class="page-404" v-if="statusCode === 404" key="404">
      Page not found
    </div>
    <div class="page-500" v-else key="500">Something went wrong...</div>
  </div>
</template>

<script>
export default {
  props: {
    error: null,
  },

  mounted() {
    console.log(this.error)
  },
  head() {
    return {};
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500;
    },
  },
};
</script>

<style>
</style>