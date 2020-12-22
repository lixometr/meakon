<template>
  <div class="col-sm-12 col-md-12 col-lg-8" v-if="items.length > 0">
    <!-- Swiper -->
    <swiper>
      <swiper-slide v-for="(item, idx) in items" :key="idx">
        <ProductSimilarItem :item="item" />
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <!-- //swiper -->
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      items: [],
    };
  },
  async fetch() {
    await this.fetchItems();
  },
  computed: {
    sliderOptions() {
      return {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 5000,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        spaceBetween: 5,
        // init: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          300: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 45,
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 45,
          },
        },
      };
    },
  },
  methods: {
    async fetchItems() {
      try {
        const result = await this.$api.$get("similarProductItems", {
          slug: this.product.slug,
        });
        this.items = result.items;
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>