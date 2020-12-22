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
        <div class="row">
          <div class="col-12 product_filter_view">
            <span>{{ $t("catalogView") }}: </span>
            <div class="list active"><img src="assets/img/list.svg" /></div>
            <div class="grid"><img src="assets/img/grid.svg" /></div>
          </div>
        </div>
        <div class="row">
          <CatalogSidebar />
          <!-- grid or list -->
          <CatalogProducts />
        </div>
      </div>
    </section>
    <!--// section products-->
    <section class="pagination">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#">
              <span class="sr-only arrow_left"
                ><img src="assets/img/arrow.svg" alt=""
              /></span>
            </a>
          </li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#">
              <span class="sr-only arrow_right"
                ><img src="assets/img/arrow.svg" alt=""
              /></span>
            </a>
          </li>
        </ul>
      </nav>
    </section>
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
  async asyncData({ $api, error, params }) {
    try {
      const category = await $api.$get("category", { slug: params.slug });
      if (!category) throw { statusCode: 404 };
      return {
        category,
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