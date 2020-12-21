<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <!-- <div>
          Доступен:
          <b>{{product.is_available}}</b>
        </div>
        <div>
          Обновлен:
          <b>{{product.updated_at | moment('DD.MM.YYYY hh:mm')}}</b>
        </div>-->
        <div>
          Создан:
          <b>{{ product.created_at | moment("DD.MM.YYYY hh:mm") }}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardBody>
        <AInput class="mb-3" required label="Название" v-model="product.name" />
        <AInput class="mb-3" label="Артикул" v-model="product.sku" />
        <Label label="Тип товара" class="mb-3">
          <v-select
            :multiple="false"
            v-model="product.product_type"
            :options="productTypes"
            label="label"
            :reduce="(item) => item.key"
            :searchable="false"
          />
        </Label>
        <CategorySelect
          class="mb-3"
          label="Категории"
          v-model="product.category"
          :multiple="true"
          required
        />
        <LabelSelect
          class="mb-3"
          label="Метки"
          :multiple="true"
          v-model="product.flags"
        />
        <AInput
          class="mb-2"
          required
          label="Slug"
          v-model="product.slug"
          @input="noSlug = false"
        />
        <Label class="mb-3" label="Ссылка:">
          <a target="_blank" :href="productUrl">{{ productUrl }}</a>
        </Label>
        <Label class="mb-3" label="Опубликовать">
          <CInputCheckbox custom :checked.sync="product.is_published" />
        </Label>
        <Label class="mb-3" label="Бонусный?">
          <CInputCheckbox custom :checked.sync="product.is_bonus" />
        </Label>
        <Label class="mb-5" label="Вид" v-if="product.is_bonus">
          <v-select
            :multiple="false"
            v-model="product.bonus_type"
            :options="bonusTypes"
            label="label"
            :reduce="(item) => item.key"
            :searchable="false"
          />
        </Label>
        <Label
          class="mb-5"
          label="Приоритет вывода (чем больше, тем товар первее)"
        >
          <NInput class="mb-0" v-model="product.sort_order" />
        </Label>
      </CCardBody>
    </CCard>
    <ProductVariations
      v-if="product.product_type === 'variation'"
      class="mt-3"
      v-model="product.product_variations"
    />
    <CollapseCard :open="false" v-if="product.product_type === 'simple'">
      <div slot="header">Цена</div>
      <div>
        <ProductPrice
          :price="product.price"
          @update:price="$set(product, 'price', $event)"
          @update:oldPrice="$set(product, 'old_price', $event)"
          :oldPrice="product.old_price"
        />
      </div>
    </CollapseCard>
    <CollapseCard :open="false" v-if="product.product_type === 'simple'">
      <div slot="header">Опции</div>
      <div>
        <ProductOptions v-model="product.product_options" />
      </div>
    </CollapseCard>
    <CollapseCard :open="false">
      <div slot="header">Фото галерея</div>
      <div>
        <EditImage
          class="mb-3"
          label="Главное изображение"
          v-model="product.default_image"
        />
        <p class="mb-2 pt-1">Дополнительные изображения</p>

        <ProductImages label="Галерея" v-model="product.images" />
      </div>
    </CollapseCard>

    <CollapseCard :open="false">
      <div slot="header">Описание товара</div>
      <div slot="default">
        <EditComponent
          c="EditMultiplyer"
          v="description"
          :items="[
            {
              c: 'AInput',
              v: 'title',
              label: 'Название вкладки',
            },
            {
              c: 'ATextArea',
              v: 'content',
              label: 'Текст',
            },
          ]"
          :schema="{
            description: [
              {
                title: '',
                content: '',
              },
            ],
          }"
          :changeValue.sync="product"
        />
      </div>
    </CollapseCard>
    <CollapseCard :open="false">
      <div slot="header">Атрибуты</div>
      <div>
        <ProductAttributes v-model="product.attributes" />
      </div>
    </CollapseCard>
    <CollapseCard :open="false">
      <div slot="header">Календарь</div>
      <ProductDate v-model="product.date" />
    </CollapseCard>
    <SeoEdit v-model="product" />
    <BtnSave @click="save">Сохранить</BtnSave>
    <CButton color="danger mt-2 mb-4" @click="onDelete">Удалить</CButton>
  </div>
</template>

<script>
import AInput from "@/components/AInput";
import NInput from "@/components/NInput";
import CategorySelect from "@/components/CategorySelect";
import LabelSelect from "@/components/LabelSelect";
import EditImage from "@/components/EditImage";
import EditFiles from "@/components/EditFiles";
import ProductImages from "@/components/Product/ProductImages";
import Label from "@/components/Label";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import ProductAttributes from "@/components/Product/ProductAttributes";
import ProductPrice from "@/components/Product/ProductPrice";
import ProductVariations from "@/components/Product/ProductVariations";
import ProductDate from "@/components/Product/ProductDate";
import ProductOptions from "@/components/Product/ProductOptions";

export default {
  name: "Product",
  components: {
    AInput,
    LabelSelect,
    ProductVariations,
    CategorySelect,
    NInput,
    EditImage,
    ProductImages,
    Label,
    EditFiles,
    ProductAttributes,
    ProductPrice,
    ProductDate,
    ProductOptions,
  },
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      product: {},
      noSlug: false,
    };
  },
  computed: {
    bonusTypes() {
      return [
        {
          key: "uncommon",
          label: 'Uncommon'
        },
        {
          key: "rare",
          label: 'Rare'
        },
        {
          key: "epic",
          label: 'Epic'
        },
        {
          key: "legendary",
          label: 'Legendary'
        },

      ]
    },  
    productUrl() {
      return (
        this.$store.getters.frontUrl + "/product/" + (this.product.slug || "")
      );
    },
    productTypes() {
      return [
        {
          key: "simple",
          label: "Простой",
        },
        {
          key: "variation",
          label: "Вариационный",
        },
      ];
    },
    horizontal() {
      return this.$store.getters.horizontal;
    },
  },
  async created() {
    this.$loading.start();
    try {
      if (!this.isNew) {
        const { data } = await this.$api.get("productByIdAdmin", {
          id: this.$route.params.id,
        });
        this.setProduct(data);
      } else {
        const { data } = await this.$api.post("products");
        this.$router.push({ name: "Product", params: { id: data._id } });
        this.product = data;
      }
    } catch (err) {
      this.$error(err);
    }

    this.$loading.stop();
  },
  methods: {
    setProduct(product) {
      if (product.order_until) {
        product.order_until = this.$moment(
          new Date(product.order_until)
        ).format("YYYY-MM-DD");
      }
      if (!product.slug) {
        this.noSlug = true;
      }
      this.product = product;
    },
    editAttrs() {
      this.$modal.show("modal-product-attributes");
    },
    async save() {
      try {
        const { data: response } = await this.$api.put(
          "productById",
          { id: this.product._id },
          this.product
        );
        this.$notify({
          group: "main",
          title: "Сохранено!",
          type: "success",
        });
        console.log(response);
      } catch (err) {
        this.$error(err);
      }
    },
    async onDelete() {
      try {
        const { data } = await this.$api.delete("productById", {
          id: this.product._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({ name: "Products" });
      } catch (err) {
        this.$error(err);
      }
    },
  },
  watch: {
    product: {
      deep: true,
      handler() {
        if (this.product.name && this.noSlug) {
          const name = this.product.name || "";
          const sValue = cyrillicToTranslit().transform(
            name.toLowerCase(),
            "-"
          );
          this.$set(this.product, "slug", sValue);
        }
      },
    },
  },
};
</script>

<style lang="scss">
</style>