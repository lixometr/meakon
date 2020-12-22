<template>
  <div class="card card-shadow">
    <div class="product_item">
      <AppImage :img="image" />
      <div class="product_title">
        {{ name }}
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
      </div>
      <div class="product_price" v-if="price">{{ price }} {{ currency }}</div>
      <div class="product_button">
        <nuxt-link class="podrobnee_btn" :to="$url.product(item.slug)">
          <div class="btn_wrapper">
            <button class="learn-more">
              <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
              </span>
              <span class="button-text">{{ $t("goToCatalog") }}</span>
            </button>
          </div>
        </nuxt-link>
      </div>
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
    price() {
      return this.item.price;
    },
    currency() {
      return this.$store.getters.currency;
    },
    image() {
      return this.item.default_image;
    },
    name() {
      return this.$langValue(this.item, "name");
    },
    attributes() {
      const attributes = this.item.attributes || [];
      const filtered = attributes.filter((attr) => !!attr.show_in_preview);
      return filtered;
    },
  },
};
</script>

<style lang="scss" >
</style>