<template>
  <div class="product-variation">
    <CCard>
      <CCardHeader @click="collapse = !collapse" class="cursor-pointer d-flex align-items-center justify-content-between">
        <span>Вариация {{ idx }} </span>
        <CButton color="danger" @click="remove()">
          <CIcon name="cil-trash"></CIcon>
        </CButton>
      </CCardHeader>
      <CCollapse :show="collapse">
        <CCardBody>
          <CCard>
            <CCardBody>
              <AttributeSelect
                class="mb-3"
                label="Атрибут"
                :multiple="false"
                v-model="item.attr"
              />
              <AttributeValueSelect
                v-if="item.attr"
                label="Значение атрибута"
                :multiple="false"
                v-model="item.attrValue"
                :attributeId="item.attr"
              />
            </CCardBody>
          </CCard>
          <CCard>
            <CCardBody>
              <AInput class="mb-3" label="Артикул" v-model="item.sku" />

              <Label label="Количество" class="mb-3">
                <NInput v-model="item.cnt" class="mb-0" />
              </Label>
              <ProductPrice
                :price.sync="item.price"
                :oldPrice.sync="item.old_price"
              />
            </CCardBody>
          </CCard>
          <CCard>
            <CCardBody>
              <h6>Опции</h6>
              <ProductOptions v-model="item.product_options" />
            </CCardBody>
          </CCard>
          
        </CCardBody>
      </CCollapse>
    </CCard>
  </div>
</template>

<script>
import AttributeSelect from "@/components/AttributeSelect";
import AttributeValueSelect from "@/components/AttributeValueSelect";
import ProductPrice from "@/components/Product/ProductPrice";
import ProductOptions from "@/components/Product/ProductOptions";
import NInput from "@/components/NInput";
import _ from "lodash";
export default {
  props: {
    value: Object,
    idx: Number,
  },
  data() {
    return {
      item: _.cloneDeep(this.value),
      collapse: false
    };
  },
  components: {
    AttributeSelect,
    AttributeValueSelect,
    ProductPrice,
    ProductOptions,
    NInput,
  },
  methods: {
    remove() {
      this.$emit("delete");
    },
  },
  watch: {
    // value: {
    //   deep: true,
    //   handler() {
    //     this.item = _.cloneDeep(this.value);
    //   },
    // },
    item: {
      deep: true,
      handler() {
        this.$emit("input", this.item);
      },
    },
  },
};
</script>

<style>
</style>