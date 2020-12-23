<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <div>
          Создан:
          <b>{{ category.created_at | moment("DD.MM.YYYY hh:mm") }}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Тексты</CCardHeader>
      <CCardBody>
        <AInput class="mb-3" label="Название" v-model="category.name" />
        <AInput class="mb-3" label="EN Название" v-model="category.name_en" />
        <AInput label="Slug" v-model="category.slug" @input="noSlug = false" />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Родитель</CCardHeader>
      <CCardBody>
        <CategorySelect
          label="Родитель"
          v-model="category.parent"
          :multiple="false"
        />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Атрибуты для фильтрации</CCardHeader>
      <CCardBody>
        <AttributeSelect
          label="Атрибуты"
          v-model="category.filter_attributes"
          :multiple="true"
        />
      </CCardBody>
    </CCard>

    <!-- <CCard>
      <CCardHeader>Изображения</CCardHeader>

      <CCardBody>
        <EditImage class="mb-5" label="Иконка" v-model="category.image" />
      </CCardBody>
    </CCard> -->

    <SeoEdit v-model="category" />
    <SeoEdit v-model="product" keyProp="seo_en" label="EN Seo" />

    <BtnSave @click="save">Сохранить</BtnSave>
    <CButton color="danger mb-3" @click="onDelete">Удалить</CButton>
  </div>
</template>

<script>
import AInput from "@/components/AInput";
import NInput from "@/components/NInput";
import ImageUpload from "@/components/ImageUpload";
import CategorySelect from "@/components/CategorySelect";
import EditImage from "@/components/EditImage";
import AppColorPicker from "@/components/AppColorPicker";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import AttributeSelect from "@/components/AttributeSelect"

export default {
  components: {
    AInput,
    NInput,
    ImageUpload,
    CategorySelect,
    EditImage,
    AppColorPicker,
    AttributeSelect
  },
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      category: {
        name: "",
        slug: "",
        image: {},
        seo: {},
      },
      noSlug: false,
    };
  },
  computed: {
    horizontal() {
      return this.$store.getters.horizontal;
    },
  },
  async created() {
    this.$loading.start();
    try {
      if (!this.isNew) {
        const { data } = await this.$api.get("categoryByIdAdmin", {
          id: this.$route.params.id,
        });
        this.category = data;
        if (!this.category.slug) {
          this.noSlug = true;
        }
      } else {
        const { data } = await this.$api.post("categories");
        this.$router.push({ name: "Category", params: { id: data._id } });
      }
    } catch (err) {
      this.$error(err);
    }

    this.$loading.stop();
  },
  methods: {
    async save() {
      try {
        const { data: response } = await this.$api.put(
          "categoryById",
          { id: this.category._id },
          this.category
        );
        this.$notify({
          group: "main",
          title: "Сохранено!",
          type: "success",
        });
      } catch (err) {
        this.$error(err);
      }
    },
    async onDelete() {
      try {
        const { data } = await this.$api.delete("categoryById", {
          id: this.category._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({ name: "Categories" });
      } catch (err) {
        this.$error(err);
      }
    },
  },
  watch: {
    category: {
      deep: true,
      handler() {
        if (this.category.name && this.noSlug) {
          const name = this.category.name || "";
          const sValue = cyrillicToTranslit().transform(
            name.toLowerCase(),
            "-"
          );
          this.$set(this.category, "slug", sValue);
        }
      },
    },
  },
};
</script>

<style lang="scss">
</style>