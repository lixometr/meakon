<template>
  <div class="product_item">
    <AppImage :img="image" />
    <div class="product_title">
      <nuxt-link :to="$url.product(item.slug)">{{ name }}</nuxt-link>
    </div>
    <div class="product_size">
      <div
        v-for="(attr, idx) in attributes"
        :key="idx"
        :class="{ product_made: idx === attributes.length - 1 }"
      >
        <span>{{ $langValue(attr.name, "name") }}:</span>
        {{ attr.value.map((itm) => $langValue(itm, "name")).join(" ") }}
      </div>
      <!-- <div class="product_made">
        <span>Производство:</span> TOP GLOVE SDN. GHD
      </div> -->
    </div>
    <div class="product_price">
      <template v-if="price">{{ price }} {{ currency }}</template>
    </div>
    <div class="product_button">
      <!-- <nuxt-link class="podrobnee_btn" :to="">
        <div class="btn_wrapper">
          <button class="learn-more">
            <span class="circle" aria-hidden="true">
              <span class="icon arrow"></span>
            </span>
            <span class="button-text">{{ }}</span>
          </button>
        </div>
      </nuxt-link> -->
      <AppButton :link="$url.product(item.slug)" :text="$t('goToCatalog') "/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    currency() {
      return this.$store.getters.currency;
    },
    name() {
      return this.$langValue(this.item, "name");
    },
    price() {
      return this.item.price;
    },
    image() {
      return this.item.default_image;
    },
    attributes() {
      const attributes = this.item.attributes || [];
      const filtered = attributes.filter((attr) => !!attr.show_in_preview);
      return filtered;
    },
  },
};
</script>

<style lang="scss"  >
</style>