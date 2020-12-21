<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand
      class="d-md-down-none text-left justify-content-start sidebar-brand-icon"
      to="/"
    >
      <img src="/logo.svg" alt="" width="65" />
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="nav" />
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from "./_nav";

export default {
  name: "TheSidebar",
  nav: nav(),
  data() {
    return {
      nav: [],
    };
  },
  async created() {
    const settings = this.$store.getters['settings/settings']
    console.log(settings)
    this.nav = await nav();
  },
  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-brand-icon {
  padding-left: 56px;
}
</style>