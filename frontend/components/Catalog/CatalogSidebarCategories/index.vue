<template>
  <ul class="show">
    <h3>{{ $t("categoriesItems") }}</h3>
    <div class="ac-container">
      <CatalogSidebarCategoriesItem
        v-for="(item, idx) in items"
        :key="idx"
        :item="item"
      />
    </div>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  async fetch() {
    await this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        const primaryCategories = await this.$api.$get("categoriesPrimary");
        const resolvers = primaryCategories.map(async (category) => {
          const children = await this.$api.$get("categoryChildrenAll", {
            slug: category.full_slug,
          });
          // console.log(category, children)
          return children;
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