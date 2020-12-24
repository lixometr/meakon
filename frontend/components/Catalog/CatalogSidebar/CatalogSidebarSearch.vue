<template>
  <ul class="search_inputs">
    <input
      type="text"
      name="search"
      :placeholder="$t('searchPlaceholder')"
      v-model="text"
      @keypress.enter="search"
    /><button class="search_btn" @click="search"></button>
  </ul>
</template>

<script>
export default {
  props: {
    value: String
  },
  data() {
    return {
      text: this.value || ''
    }
  },
  methods: {
    search() {
      this.$router.push({
        query: {
          search: this.text
        }
      })
    }
  }
};
</script>

<style lang="scss" >
</style>