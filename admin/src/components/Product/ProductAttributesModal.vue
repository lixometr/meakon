<template>
  <modal
    name="modal-product-attributes"
    :adaptive="true"
    width="100%"
    height="100%"
    class="product-attributes-modal"
  >
    <AppModal title="Редактировать атрибуты" @close="close">
      <template>
        <div class="p-4">
          <AttributeSelect class="mb-2" :value="attributeNameIds" @input="changeAttrName" />
          <div class="py-2 text-center">
            <b>Атрибутов {{items.length}}</b>
          </div>
          <CRow class="mb-2 border-top pt-2" alignVertical="center">
            <CCol :class="horizontal.label">
              <div class="text-left">
                <b>Атрибут</b>
              </div>
            </CCol>
            <CCol :class="horizontal.input">
              <div>
                <b>Значение</b>
              </div>
            </CCol>
          </CRow>
          <CRow
            class="border-top py-2 bg-light"
            v-for="(attribute, idx) in items"
            :key="idx"
            alignVertical="center"
          >
            <CCol :class="horizontal.label">
              <div class="text-left">{{getAttrName(attribute.name)}}</div>
            </CCol>
            <CCol :class="horizontal.input">
              <AttributeValueSelect
                inputClass="bg-white"
                :attributeId="attribute.name"
                :value="attribute.value"
                @input="changeAttrValue(idx, $event)"
              />
            </CCol>
          </CRow>
        </div>
      </template>
      <template #footer>
        <div class="d-flex justify-content-end">
          <CButton class="mr-2" color="secondary" @click="close">Отменить</CButton>
          <CButton color="success" @click="save">Сохранить</CButton>
        </div>
      </template>
    </AppModal>
  </modal>
</template>

<script>
import AttributeValueSelect from "@/components/AttributeValueSelect";
import AttributeSelect from "@/components/AttributeSelect";
import AppModal from "@/components/Modals/Modal";
export default {
  props: {
    // [{name: 'attr-name-id', value: ['attr-value-id']]
    value: Array,
  },
  data() {
    return {
      attributeNames: [],
    };
  },
  components: {
    AttributeValueSelect,
    AttributeSelect,
    AppModal,
  },
  computed: {
    horizontal() {
      return this.$store.getters.horizontal;
    },
    items() {
      return this.value;
    },
    attributeNameIds() {
      return this.items.map((attr) => attr.name);
    },
  },
  async created() {
    await this.fetchNames();
  },
  methods: {
    save() {
      this.close();
    },
    getAttrName(id) {
      const attrName =
        this.attributeNames.find((attr) => attr._id === id) || {};
      return attrName.name;
    },
    async fetchNames() {
      const attributeIds = this.value.map((attr) => attr.name);
      const resolvers = attributeIds.map(async (attrId) => {
        const { data } = await this.$api.get("attributeById", { id: attrId });
        return data;
      });
      const attrNames = await Promise.all(resolvers);
      this.attributeNames = attrNames;
    },
    changeAttrValue(idx, newValue) {
      const attrs = [...this.items];
      if (!attrs[idx].value) attrs[idx].value = [];
      attrs[idx].value = newValue;
      this.$emit("input", attrs);
    },
    changeAttrName(newValue) {
      const newAttrs = [];
      newValue.forEach((value) => {
        const idx = this.items.findIndex((attr) => attr.name === value);
        if (idx < 0) {
          newAttrs.push({
            name: value,
            value: [],
          });
        } else {
          newAttrs.push(this.items[idx]);
        }
      });
      this.$emit("input", newAttrs);
    },
    close() {
      this.$emit("close");
      this.$modal.hide("modal-product-attributes");
    },
  },
  watch: {
    async value() {
      await this.fetchNames();
    },
  },
};
</script>

<style lang="scss" scoped>
.product-attributes-modal {
  z-index: 99999;
}

.content {
  padding-top: 150px;
}
</style>