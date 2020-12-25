<template>
  <div>
    <!-- mobileMenu -->
    <header class="header">
      <div class="mlogo"><img src="/assets/img/mobile_logo.png" alt="" /></div>

      <div class="mswaper">
        <ChangeLanguageMobile />
      </div>
      <div class="filter_toggler" v-if="showFiltersBtn" @click="toggleFilterSidebar"></div>

      <div class="burger">
        <div class="burger__patty"></div>
        <div class="burger__patty"></div>
        <div class="burger__patty"></div>
      </div>

      <nav class="menu">
        <div class="menu__brand"></div>
        <ul class="menu__list">
          <li class="menu__item" v-for="(itm, idx) in values.menu" :key="idx">
            <nuxt-link :to="itm.url || '#'" class="menu__link">{{
              $langValue(values, `menu.[${idx}].name`)
            }}</nuxt-link>
          </li>

          <li class="menu__item">
            <a :href="'tel:' + values.phone" class="tel__link">{{
              values.phone
            }}</a>
          </li>
        </ul>
      </nav>
    </header>
    <section class="hero"></section>
    <!-- //mobileMenu -->
    <!-- fix меню -->
    <header class="offer">
      <div class="container-fluid">
        <div class="row offer_place">
          <!-- logo + switcher -->
          <div class="col-lg-4 col-md-12 top_menu">
            <!-- logo -->
            <nuxt-link class="logo" to="/"
              ><AppImage :img="values.logo"
            /></nuxt-link>
            <!-- //logo -->
            <ChangeLanguage />
          </div>
          <!-- logo + switcher -->

          <!-- Nav header-->
          <div class="col-lg-8 col-md-12 navi">
            <nav>
              <nuxt-link
                class="nav_item"
                :to="itm.url || '#'"
                v-for="(itm, idx) in values.menu"
                :key="idx"
                >{{ $langValue(values, `menu.[${idx}].name`) }}</nuxt-link
              >
              <!-- Telephone -->
              <a :href="'tel:' + values.phone">{{
                $langValue(values, "phone")
              }}</a>
              <!-- //Telephone -->
            </nav>
          </div>
          <!-- //Nav header-->
        </div>
      </div>
    </header>
    <!-- //fix меню -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      values: {},
    };
  },
  computed: {
    showFiltersBtn() {
      return this.$route.path.indexOf('/catalog') > -1
      return this.$store.getters.showFiltersBtn
    },
    showFiltersSidebar() {
      return this.$store.getters.showFiltersSidebar
    },
  },
  async fetch() {
    try {
      const { values } = await this.$api.$get("widgetByName", {
        name: "header",
      });
      this.values = values;
    } catch (err) {}
  },

  methods: {
    toggleFilterSidebar() {
      this.$store.commit('setFiltersSidebar', !this.showFiltersSidebar)
    }
  },
};
</script>

<style lang="scss" >
</style>