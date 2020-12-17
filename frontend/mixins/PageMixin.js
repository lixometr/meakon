export default ({ slug }) => ({
  head() {
    return {
      title: this.page.seo && this.page.seo.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.page.seo && this.page.seo.description,
        },
        { name: "keywords", content: this.page.seo && this.page.seo.keywords },
      ],
    }
  },
  async asyncData({ $api, error, params }) {
    try {
      const page = await $api.$get("page", { slug: slug || params.slug });
      return {
        page,
        template: page.template,
      };
    } catch (err) {
      error(err);
    }
  },
})