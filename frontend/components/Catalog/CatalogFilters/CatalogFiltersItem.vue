<template>
  <ul class="filter_tabs__material show">
    <h3>{{ name }}</h3>
    <ul class="filter_tab__subcat">
      <!-- <li></li> -->
      <li v-for="(attrValue, idx) in attrValues" :key="idx">
        <label class="checkbox-other">
          <input
            type="checkbox"
            :checked="value.includes(attrValue._id)"
            @change="onValueChange($event, attrValue._id)"
          />
          <span>{{ attrValue.name }}</span>
        </label>
      </li>
    </ul>
  </ul>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    theId() {
      return `attr-value-${this._uid}-`;
    },
    name() {
      return this.$langValue(this.item.name, "name");
    },
    attrValues() {
      return this.item.value.map((attrVal) => ({
        ...attrVal,
        name: this.$langValue(attrVal, "name"),
      }));
    },
  },
  methods: {
    emitData(value) {
      this.$emit("input", value);
    },
    onValueChange(e, attrValueId) {
      const active = e.target.checked;
      if (active) {
        if (this.value.includes(attrValueId)) return;
        const newValue = [...this.value, attrValueId];
        this.emitData(newValue);
      } else {
        console.log('here', this.value, attrValueId)
        if (!this.value.includes(attrValueId)) return;
        const newValue = this.value.filter((id) => id !== attrValueId);
        this.emitData(newValue);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>