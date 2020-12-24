<template>
  <div class="col-lg-7 col-sm-12">
    <div class="product_card__title">
      <h1>
        {{ name }}
      </h1>
    </div>
    <div class="product_card__header" >
      <span v-if="sku">{{ $t("skuLong") }}: {{ sku }}</span>
    </div>
    <div class="product_card__desc">
      <div class="product_card__desc__column">
        <ProductAttributes :items="attributes" />

        <div class="product_card__desc__column__special">
          <h2>{{ $t("getPrice") }}</h2>

          <a class="podrobnee_btn" href="#" @click.prevent="openModal">
            <div class="btn_wrapper">
              <button class="learn-more">
                <span class="circle" aria-hidden="true">
                  <span class="icon arrow"></span>
                </span>
                <span class="button-text">{{ $t("getPrice") }}</span>
              </button>
            </div>
          </a>
        </div>

        <ul class="product_card__price">
          <li v-if="price">
            {{ $t("price") }}: <span>{{ price }} {{ currency }}</span>
          </li>
        </ul>
      </div>
    </div>
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
  computed: {
    currency() {
      return this.$store.getters.currency;
    },
    price() {
      return this.product.price;
    },
    name() {
      return this.$langValue(this.product, "name");
    },
    sku() {
      return this.product.sku;
    },
    attributes() {
      return this.product.attributes;
    },
  },
  methods: {
    openModal() {
      this.$modal.open('review', {
        props: {
          type: 'product'
        }
      })
    }
  }
};
</script>

<style lang="scss" >
</style>