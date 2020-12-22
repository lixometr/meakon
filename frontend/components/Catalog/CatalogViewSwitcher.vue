<template>
  <div class="row">
    <div class="col-12 product_filter_view">
      <span>{{ $t("catalogView") }}: </span>
      <div
        class="list"
        :class="{ active: value === 'list' }"
        @click="changeView('list')"
      >
        <img src="/assets/img/list.svg" />
      </div>
      <div
        class="grid"
        :class="{ active: value === 'grid' }"
        @click="changeView('grid')"
      >
        <img src="/assets/img/grid.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
  },
  methods: {
    changeView(view) {
      this.$emit("input", view);
    },
  },
};
</script>

<style lang="scss" >
</style>