<template>
  <div class="product-attribute p-3 border">
    <div class="d-flex mb-2 justify-content-end">
      <CButton color="danger" @click="removeAttr()">
        <CIcon name="cil-trash"></CIcon>
      </CButton>
    </div>
    <Label label="Атрибут" class="mb-3">
      <AttributeSelect
        :value="item.name"
        :multiple="false"
        @input="changeName($event)"
      />
    </Label>
    <Label class="mb-3" label="Показывать на странице товара">
      <CInputCheckbox
        custom
        :checked="item.show"
        @update:checked="changeShow($event)"
      />
    </Label>
    <div class="product-attribute__values">
      <Label label="Значения атрибута">
        <AttributeValueSelect
          :value="item.value"
          @input="changeAttrValue"
          :attributeId="item.name"
        />
      </Label>
    </div>
  </div>
</template>

<script>
import AttributeSelect from "@/components/AttributeSelect";
import AttributeValueSelect from "@/components/AttributeValueSelect";

export default {
  props: {
    item: Object,
  },
  components: {
    AttributeSelect,
    AttributeValueSelect,
  },
  computed: {},
  methods: {
    removeAttr() {
      this.$emit('delete')
    },
    changeShow(show) {
      const newItem = { ...this.item, show };
      this.$emit("input", newItem);
    },
    changeName(name) {
      const newItem = { ...this.item, name };
      this.$emit("input", newItem);
    },
    changeAttrValue(value) {
      const newItem = { ...this.item, value };
      this.$emit("input", newItem);
    },
  },
};
</script>

<style>
</style>