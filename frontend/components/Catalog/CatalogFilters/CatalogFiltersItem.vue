<template>
  <ul class="filter_tabs__material show">
    <h3>Материал</h3>
    <ul class="filter_tab__subcat">
      <li></li>
      <li>
        <label class="checkbox-other">
          <input type="checkbox" />
          <span>Checkbox #2</span>
        </label>
      </li>
      <li>
        <label class="checkbox-other">
          <input type="checkbox" />
          <span>Checkbox #3</span>
        </label>
      </li>
    </ul>
  </ul>
</template>

<script>
export default {
    props: {
        item:{
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style lang="scss" scoped>
</style>