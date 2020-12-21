<template>
  <main>
    <notifications group="main" />
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  name: "App",
 
};
</script>

<style lang="scss">
// Import Main styles for this application
@import "assets/scss/style";
.vue-notification-group {
  z-index: 99999!important;
}
</style>
