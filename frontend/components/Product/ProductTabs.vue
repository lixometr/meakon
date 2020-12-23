<template>
  <section class="product_tabs">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-1 d-none d-md-block"></div>
        <div class="col-lg-11 col-sm-12">
          <div class="tabs-widget">
            <div class="tabs-widget__header">
              <div class="tabs-widget__item" v-for="(tab, idx) in tabs" :key="idx">
                <a href="#tab-1-1" :class="{active: activeTab === idx}" @click.prevent="selectTab(idx)">{{$langValue(tab, 'title')}}</a>
              </div>
              <div class="tabs-widget__item" v-if="showCharacteristics">
                <a href="#tab-1-1" :class="{active: activeTab === tabs.length}" @click.prevent="selectTab(tabs.length)">{{$t('characteristics')}}</a>
              </div>
             
            </div>
            <div class="content">
              <div class="item" :class="{active: activeTab === idx}" v-for="(tab, idx) in tabs" :key="idx">
                <AText :text="$langValue(tab, 'content')"/>
              </div>

              <div class="item" :class="{active: activeTab === tabs.length}" v-if="showCharacteristics">
                <ProductCharacteristics :product="product"/>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
      activeTab: 0
    }
  },
  computed: {
    showCharacteristics() {
      return this.product.attributes.length > 0
    },
    tabs() {
      return this.product.description || []
    }
  },
  methods: {
    selectTab(idx) {
      this.activeTab = idx
    }
  }
};
</script>

<style lang="scss" >
</style>