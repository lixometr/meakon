<template>
  <!-- хлебные крошки -->
  <div class="breadthums">
    <ul>
      <li v-if="showMain"><nuxt-link to="/">Главная</nuxt-link></li>
      <li v-for="(item, idx) in items" :key="idx">
        <component
          :is="item.link ? 'nuxt-link' : 'a'"
          :to="item.link || '#'"
          class="active"
          >{{ item.name }}</component
        >
      </li>
    </ul>
  </div>
  <!-- //хлебные крошки -->
</template>

<script>
export default {
  props: {
    items: Array,
    showMain: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" >
</style>