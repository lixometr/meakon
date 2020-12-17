
<script>
export default {
  data() {
    return {
      searchPhrase: "",
      activePage: parseInt(this.$route.query.page) || 1,
      info: {},
      items: [],
    };
  },
  async created() {
    this.$loading.start();
    await this.fetchItems();
    this.$loading.stop();
  },
  methods: {
    async removeItem(id) {
      try {
        const { data } = await this.$api.delete(this.removeRoute, {
          id,
        });
        this.afterRemove(data);
      } catch (err) {
        this.$error(err);
      }
    },
    async fetchItems() {
      try {
        const { data } = await this.$api.get(
          this.fetchRoute,
          {
            text: this.searchPhrase,
          },
          {
            params: {
              page: this.activePage,
            },
          }
        );
        this.setData(data);
      } catch (err) {
        this.$error(err);
      }
    },
    setData({ items, info, error }) {
      if (error) {
        throw error;
      }
      this.items = items;
      this.info = info;
    },
    afterRemove() {
      this.$notify({
        group: "main",
        type: "success",
        title: "Удалено!",
      });
      this.fetchItems();
    },
  },
  watch: {
    searchPhrase() {
      this.fetchItems();
    },
    activePage() {
      this.$router.replace({
        query: { ...this.$route.query, page: this.activePage },
      });
      this.fetchItems();
    },
  },
};
</script>

