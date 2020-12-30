<template>
  <div id="filter_page">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <PageBreadcrumbs :items="breadcrumbsItems" />
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
        <div class="row" v-if="isReady">
          <CatalogSidebar
            :filters="products.filters"
            :showPrice="category.show_filter_price"
          />
          <!-- grid or list -->
          <CatalogProducts :view="view" :items="products.items" />
        </div>
      </div>
    </section>
    <!--// section products-->
    <CatalogPagination :nowPage="nowPage" :totalPages="totalPages" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.langSeo.title || this.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.langSeo.description,
        },
        { name: "keywords", content: this.langSeo.keywords },
      ],
      link: [
        {
          rel: "stylesheet",
          href:
            "https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/css/ion.rangeSlider.min.css",
        },
      ],
    };
  },
  data() {
    return {
      view: "list",
      isReady: true,
    };
  },
  watchQuery: true,
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setFiltersBtn", false);
    next();
  },
  async asyncData({ $api, error, params, query, store }) {
    try {
      store.commit("setFiltersBtn", true);
      const slug = params.pathMatch;
      const category = await $api.$get("category", { slug });
      if (!category) throw { statusCode: 404 };
      store.dispatch("filters/init", query);

      const filters = store.getters["filters/active"];
      let products;
      if (query.search) {
        products = await $api.$get("productsSearch", { text: query.search });
      } else {
        products = await $api.$get(
          "categoryProducts",
          {
            slug,
          },
          {
            params: {
              page: query.page || 1,
              filters,
            },
          }
        );
      }
      store.commit("filters/setItems", products.filters);
      const breadcrumbs = await $api.$get("categoryParents", { slug });
      breadcrumbs.pop();
      return {
        category,
        products,
        breadcrumbs,
      };
    } catch (err) {
      error(err);
    }
  },
  computed: {
    nowPage() {
      return this.products.info.nowPage;
    },
    totalPages() {
      return this.products.info.totalPages;
    },
    breadcrumbsItems() {
      const breadcrumbs = this.breadcrumbs.map((item) => ({
        name: this.$langValue(item, "name"),
        link: this.$url.category(item.full_slug),
      }));
      breadcrumbs.push({ name: this.name, link: "" });
      return breadcrumbs;
    },
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