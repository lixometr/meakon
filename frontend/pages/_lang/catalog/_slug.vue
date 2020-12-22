<template>
  <div id="filter_page">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <PageBreadcrumbs :items="[{ name, link: '' }]" />
        </div>
      </div>
    </div>
    <section class="products">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 product_filter_header">
            <h1>{{ name }}</h1>
          </div>
        </div>
        <CatalogViewSwitcher v-model="view" />
        <div class="row">
          <CatalogSidebar />
          <!-- grid or list -->
          <CatalogProducts :view="view" :items="products.items"/>
        </div>
      </div>
    </section>
    <!--// section products-->
    <CatalogPagination />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.langSeo.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.langSeo.description,
        },
        { name: "keywords", content: this.langSeo.keywords },
      ],
    };
  },
  data() {
    return {
      view: "list",
    };
  },
  async asyncData({ $api, error, params }) {
    try {
      const category = await $api.$get("category", { slug: params.slug });
      if (!category) throw { statusCode: 404 };
      const products = await $api.$get("categoryProducts", {
        slug: params.slug,
      });
      return {
        category,
        products
      };
    } catch (err) {
      error(err);
    }
  },
  computed: {
    langSeo() {
      return this.$langValue(this.category, "seo") || {};
    },
    name() {
      return this.$langValue(this.category, "name");
    },
  },
};
</script>

<style lang="scss" >
</style>