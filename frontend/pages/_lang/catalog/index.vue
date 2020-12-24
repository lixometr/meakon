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
          <CatalogSidebar :showFilters="false" />
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
      title: this.langSeo.title,
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
  async asyncData({ $api, error, params, query, store }) {
    try {
      let products;
      if (query.search) {
        products = await $api.$get("productsSearch", { text: query.search });
      } else {
        products = await $api.$get(
          "products",
          {},
          {
            params: {
              page: query.page || 1,
            },
          }
        );
      }
      return {
        products,
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
      return [{ name: this.name, link: "" }];
    },
    langSeo() {
      return this.$t('catalog.seo')
    },
    name() {
      return this.$t("catalogTitle");
    },
  },
};
</script>

<style lang="scss" >
</style>