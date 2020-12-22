export default ({ slug } = {}) => ({
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
    }
  },
  computed: {
    langSeo() {
      return this.$langValue(this.page, 'seo') || {}
    }
  },
  async asyncData({ $api, error, params }) {
    try {
      const page = await $api.$get("page", { slug: slug || params.slug });
      if (!page) throw { statusCode: 404 }
      return {
        page,
        template: page.template,
      };
    } catch (err) {
      error(err);
    }
  },
})