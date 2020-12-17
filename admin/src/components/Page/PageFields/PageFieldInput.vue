<template>
  <Label label=" ">
    <template v-slot:label>
      <div>{{ label }}</div>
      <div class="page-field-var-name">
        <i>{{ varName }}</i>
      </div>
    </template>
    <template v-slot:default>
      <AInput  :value="value" @keypress="onKeyPress" @input="onInput" />
    </template>
  </Label>
</template>



<script>
import Mixin from "./PageFieldMixin";
// import { required,} from "vuelidate/lib/validators";

export default {
  // validations: {
  //   value: {
  //     required
  //   }
  // },
  mixins: [Mixin],
  methods: {
    onKeyPress(e) {
      const maxLength = this.settings.limit;
      if (maxLength && this.value && maxLength <= this.value.length) {
        e.preventDefault();
      }
    },
    onInput(value) {
      this.emitData(value);
    },
  },
};
</script>

<style>
</style>