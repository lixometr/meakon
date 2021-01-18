<template>
  <div>
    <template v-if="hasSub">
      <input :id="thisId" name="accordion-1" type="checkbox" />
      <label class="have_sub" :for="thisId">{{ name }}</label>
      <article class="ac-small">
        <ul class="filter_tab__subcat">
          <!-- <li><a href="#" class="active">Подкатегория 1</a></li> -->
          <li v-for="(subItem, idx) in item.children" :key="idx">
            <nuxt-link :to="$url.category(subItem.category.full_slug)" active-class="active" @click.native="hideSidebar">{{
              $langValue(subItem.category, "name")
            }}</nuxt-link>
          </li>
        </ul>
      </article>
    </template>
    <template v-else>
      <label class="not_sub" :for="thisId">
        <nuxt-link :to="$url.category(item.category.full_slug)" active-class="active" @click.native="hideSidebar">{{ name }}</nuxt-link>
      </label>
    </template>
    
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
  },
  methods: {
    hideSidebar() {
      this.$store.commit('setFiltersSidebar', false)
    }
  },
  computed: {
    name() {
      return this.$langValue(this.item.category, "name");
    },
    hasSub() {
      return this.item.children && this.item.children.length > 0;
    },
    thisId() {
      return "ac-" + this._uid;
    },
  },
};
</script>

<style lang="scss" >
</style>