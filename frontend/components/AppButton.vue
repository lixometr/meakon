<template>
  <div class="Button_page">
    <nuxt-link class="more-button-wrap" v-on="$listeners" :to="link || '#'" data-main-index="">
      <span class="more-button-background">
        <span class="more-button-ico"></span>
      </span>
      <span class="more-button-title">{{ text }} </span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
    props: {
        link: String,
        text: String
    }
};
</script>

<style lang="scss" >
</style>