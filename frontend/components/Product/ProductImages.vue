<template>
  <!-- колонка изображений -->
  <div class="col-lg-5 col-sm-12">
    <div class="product_card__images">
      <div class="popup-gallery">
        <div class="product_card__images__min">
          <!-- big -->
          <a
            :href="image && image.url"
            v-for="(image, idx) in images"
            :key="idx"
          >
            <!-- small -->
            <AppImage :img="image" :holder="true" />
          </a>
        </div>

        <div class="product_card__images__big">
          <a :href="imageUrl" :data-source="imageUrl">
            <div class="product_card__images__big__wrapper">
              <AppImage :img="imageUrl" :holder="true" />
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- //колонка изображений -->
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    imageUrl() {
      return this.product.default_image && this.product.default_image.url;
    },
    images() {
      return this.product.images;
    },
  },
};
</script>

<style lang="scss" >
</style>