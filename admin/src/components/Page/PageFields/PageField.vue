<template>
  <div class="page-field mb-3">
    <PageFieldChooser
      :template="template"
      :type="type"
      :value="value"
      @input="onChange"
      ref="cType"
    />
    <Label class="mt-1" label=" " v-if="!isValid">
      <p class="text-danger">Заполните это поле</p>
    </Label>
    <Label class="mt-1" label=" ">
      <p class="text-dark">{{ template.comment }}</p>
    </Label>
  </div>
</template>

<script>
import EditComponent from "@/components/Edit/EditComponent";
import PageFieldChooser from "./PageFieldChooser";
export default {
  props: {
    value: null,
    template: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isValid: true,
    };
  },

  components: {
    EditComponent,
    PageFieldChooser,
  },
  computed: {
    type() {
      return this.template.type;
    },
  },
  methods: {
    validate() {
      const valid = this.$refs.cType.validate();
      this.isValid = valid;
      return valid;
    },
    onChange(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style>
</style>