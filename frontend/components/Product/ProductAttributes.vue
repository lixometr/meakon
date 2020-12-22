<template>
  <ul>
    <li v-for="(item, idx) in items" :key="idx">
      {{ $langValue(item.name, "name") }}:<span>
        {{ item.value.map((itm) => $langValue(itm, "name")).join(" ") }}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" >
</style>