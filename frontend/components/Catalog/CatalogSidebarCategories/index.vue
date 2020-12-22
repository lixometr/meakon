<template>
  <ul class="show">
    <h3>Категории товаров</h3>
    <div class="ac-container">
      <CatalogSidebarCategoriesItem v-for="(item, idx) in items" :key="idx"/>
      <!-- <div>
        <label class="not_sub" for="ac-2">
          <a href="#0">Скальпели</a>
        </label>
      </div> -->

   
    </div>
  </ul>
</template>

<script>
export default {
    items: {
        type: Array,
        default: () => []
    }
};
</script>

<style lang="scss" >
</style>