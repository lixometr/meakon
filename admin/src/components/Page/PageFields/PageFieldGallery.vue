<template>
  <Label label=" ">
    <template v-slot:label>
      <div>{{ label }}</div>
      <div class="page-field-var-name">
        <i>{{ varName }}</i>
      </div>
    </template>
    <template v-slot:default>
      <EditImageMultiple :value="value" @input="onInput" :maximum="settings.max"/>
    </template>
  </Label>
</template>



<script>
import Mixin from "./PageFieldMixin";
import ImageUpload from "@/components/ImageUpload";
import EditImageMultiple from "@/components/EditImageMultiple"
// import { required,} from "vuelidate/lib/validators";

export default {
  // validations: {
  //   value: {
  //     required
  //   }
  // },
  components: {
    ImageUpload,
    EditImageMultiple
  },
  mixins: [Mixin],
  methods: {
    onInput(value) {
      console.log("on inp", value);
      this.emitData(value);
    },
  },
};
</script>

<style>
</style>