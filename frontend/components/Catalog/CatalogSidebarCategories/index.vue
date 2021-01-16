<template>
  <ul :class="{show: show, hide: !show}">
    <h3>{{ $t("categoriesItems") }}</h3>
    <div class="ac-container">
      <CatalogSidebarCategoriesItem
        v-for="(item, idx) in items"
        :key="idx"
        :item="item"
      />
    </div>
    <div class="filter_tab__hide" @click="toggleShow">
      <div class="arrow arrow-top"></div>
    </div>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      show: true
    };
  },
  async fetch() {
    await this.fetchItems();
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    },
    async fetchItems() {
      try {
        const primaryCategories = await this.$api.$get("categoriesPrimary");
        const resolvers = primaryCategories.map(async (category) => {
          let children = [];
          try {
            children = await this.$api.$get("categoryChildrenAll", {
              slug: category.full_slug,
            });
          } catch (err) {}

          // console.log(category, children)
          return children || [];
        });
        const categories = await Promise.all(resolvers);
        this.items = categories;
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>