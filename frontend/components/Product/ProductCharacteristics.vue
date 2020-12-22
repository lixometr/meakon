<template>
  <ol>
    <li v-for="(item, idx) in attributes" :key="idx">
      {{ $langValue(item.name, "name") }}:<span>
        {{ item.value.map((itm) => $langValue(itm, "name")).join(" ") }}
      </span>
    </li>
  </ol>
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
    attributes() {
      const attributes = this.product.attributes || [];
      return attributes;
    },
  },
};
</script>
 
<style lang="scss" >
</style>