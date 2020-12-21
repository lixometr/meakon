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
      <CCardHeader>Изображения</CCardHeader>

      <CCardBody>
        <EditImage class="mb-5" label="Иконка" v-model="category.image" />
        <EditImage
          class="mb-5"
          label="Изображение персонажа"
          v-model="category.image_person"
        />
        <EditImage
          class="mb-5"
          label="Изображение текста"
          v-model="category.image_text"
        />
        <EditImage label="Фоновое изображение" v-model="category.image_bg" />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Метка soon</CCardHeader>
      <CCardBody>
        <Label class="mb-5" label="Вывдить метку?">
          <CInputCheckbox custom :checked.sync="category.is_soon" />
        </Label>
        <Label label="Цвет метки 1">
          <AppColorPicker class="mb-5" v-model="category.soon_color1" />
        </Label>
        <Label label="Цвет метки 2">
          <AppColorPicker v-model="category.soon_color2" />
        </Label>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Метка new</CCardHeader>
      <CCardBody>
        <Label class="mb-5" label="Вывдить метку?">
          <CInputCheckbox custom :checked.sync="category.is_new" />
        </Label>
        <Label label="Цвет метки 1">
          <AppColorPicker class="mb-5" v-model="category.new_color1" />
        </Label>
        <Label label="Цвет метки 2">
          <AppColorPicker v-model="category.new_color2" />
        </Label>
      </CCardBody>
    </CCard>
    <SeoEdit v-model="category" />

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

export default {
  components: {
    AInput,
    NInput,
    ImageUpload,
    CategorySelect,
    EditImage,
    AppColorPicker,
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