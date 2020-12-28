<template>
  <div class="col-lg-7 col-sm-12">
    <div class="product_card__title">
      <h1>
        {{ name }}
      </h1>
    </div>
    <div class="product_card__header">
      <span v-if="sku">{{ $t("skuLong") }}: {{ sku }}</span>
    </div>
    <div class="product_card__desc">
      <div class="product_card__desc__column">
        <ProductAttributes :items="attributes" />

        <div class="product_card__desc__column__special">
          <h2>{{ $t("getPrice") }}</h2>

          <div class="Button_page">
            <a
              class="js-open-modal"
              @click.prevent="openModal"
              data-modal="modal"
            >
            </a
            ><a class="more-button-wrap" @click.prevent="openModal">
              <span class="more-button-background">
                <span class="more-button-ico"></span>
              </span>
              <span class="more-button-title">{{ $t("getPrice") }} </span>
            </a>
          </div>
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
      this.$modal.open("review", {
        props: {
          type: "product",
        },
      });
    },
  },
};
</script>

<style lang="scss" >
</style>