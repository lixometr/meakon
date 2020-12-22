<template>
  <div id="product_card">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <PageBreadcrumbs :items="breadcrumbItems" />
        </div>
      </div>
    </div>

    <section class="product_card">
      <div class="container-fluid">
        <div class="row">
          <ProductImages :product="product" />

          <!-- Описание товара -->
          <ProductInfo :product="product" />
          <!-- Описание товара -->
        </div>
      </div>
    </section>

    <ProductTabs :product="product" />

    <!-- section поч мы -->
    <section class="med_why similar_products">
      <div class="container-fluid">
        <div class="row">
          <!-- Навигация -->
          <div class="col-1 d-sm-none d-md-block">
            <i class="nav-fill">&nbsp;</i>
            <div class="left_nav">
              <img src="assets/img/section.png" />
              <span>{{ $t("recommend") }}</span>
            </div>
          </div>
          <!-- //Навигация -->

          <!-- Описание блока -->
          <div class="col-sm-12 col-md-3 col-lg-3">
            <h2>{{ $t("similarItems") }}</h2>
            <p class="desc"></p>
          </div>
          <!-- //Описание блока -->
          <ProductSimilarItems :product="product" />
        </div>
      </div>
    </section>
    <!--// section поч мы-->
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
      const product = await $api.$get("product", { slug: params.slug });
      if (!product) throw { statusCode: 404 };
      const productCategory = product.category[0] || {};
      const parentCategories = await $api.$get("categoryParents", {
        slug: productCategory.slug,
      });
      return {
        product,
        breadcrumbs: parentCategories || [],
      };
    } catch (err) {
      error(err);
    }
  },
  computed: {
    langSeo() {
      return this.$langValue(this.product, "seo") || {};
    },
    name() {
      return this.$langValue(this.product, "name");
    },
    breadcrumbItems() {
      const breadcrumbs = this.breadcrumbs.map((item) => ({
        name: this.$langValue(item, "name"),
        link: this.$url.category(item.full_slug),
      }));
      breadcrumbs.push({ name: this.name, link: "" });
      return breadcrumbs;
    },
  },
};
</script>

<style lang="scss" >
</style>