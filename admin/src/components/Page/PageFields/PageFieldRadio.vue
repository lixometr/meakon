<template>
  <div>
    <Label label=" ">
      <template v-slot:label>
        <div>{{ label }}</div>
        <div class="page-field-var-name">
          <i>{{ varName }}</i>
        </div>
      </template>
      <CInputRadioGroup
        custom
        :options="options"
        :checked="value"
        @update:checked="onChange($event)"
      />
    </Label>
  </div>
</template>



<script>
import Mixin from "./PageFieldMixin";
export default {
  mixins: [Mixin],
  computed: {
    options() {
      return this.settings.options.map((opt) => ({
        value: opt.var_name,
        label: `${opt.value} (${opt.var_name})`,
      }));
    },
  },
  methods: {
    onChange(item) {
      this.emitData(item);
    },
    addItem(item) {},
  },
};
</script>

<style>
</style>