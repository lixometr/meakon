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
              <img src="/assets/img/section.png" />
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
          href: "/assets/js/magnific/magnific-popup.css",
        },
      ],
      script: [
        {
          type: "text/javascript",
          src: "/assets/js/magnific/jquery.magnific-popup.min.js",
          defer: true,
          callback: () => (this.isReady = true),
        },
      ],
    };
  },
  data() {
    return {
      view: "list",
      isReady: false,
    };
  },
  mounted() {},
  async asyncData({ $api, error, redirect, params }) {
    try {
      const product = await $api.$get("product", { slug: params.slug });

      if (!product) throw { statusCode: 404 };
      const productCategory = product.category[0] || {};
      let parentCategories = [];
      try {
        parentCategories = await $api.$get("categoryParents", {
          slug: productCategory.full_slug,
        });
      } catch (err) {
        console.log(err);
      }

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
  methods: {
    initScripts() {
      $(".popup-gallery").magnificPopup({
        delegate: "a",
        type: "image",
        tLoading: "Loading image #%curr%...",
        mainClass: "mfp-img-mobile",
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
        },
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
          titleSrc: function (item) {
            return item.el.attr("title") + "<small>Некий текст</small>";
          },
        },
      });
    },
  },
  watch: {
    isReady() {
      if (this.isReady) {
        this.initScripts();
      }
    },
  },
};
</script>

<style lang="scss" >
</style>