<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    changeLanguage() {
      const slug = this.isEng ? "ru" : "en";
      const oldLanguage = this.$store.getters["language/language"];
      this.$store.dispatch("language/setLanguage", slug);
      const newLanguage = this.$store.getters["language/language"];
      let newUrl = this.$route.fullPath;
      newUrl = newUrl.replace(oldLanguage, newLanguage);
      this.$router.push(newUrl);
      if (newLanguage === oldLanguage) return;
    },
  },
  computed: {
    isEng() {
      return this.storeLang === "en";
    },
    storeLang() {
      return this.$store.getters["language/language"];
    },
  },
  watch: {
    storeLang() {
    //   this.isEng = this.storeLang === "en";
    },
  },
};
</script>
