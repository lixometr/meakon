<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <div>
          Создан:
          <b>{{ data.created_at | moment("DD.MM.YYYY hh:mm") }}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Редактировать запись</CCardHeader>
      <CCardBody>
        <AInput
          class="mb-3"
          :isValid="$v.data.name.$error ? false : undefined"
          label="Заголовок"
          v-model="data.name"
        />
        <AInput
          class="mb-3"
          label="Slug"
          :isValid="$v.data.slug.$error ? false : undefined"
          v-model="data.slug"
          @input="noSlug = false"
        />
      <SectionTagSelect label="Теги" v-model="data.tags" />

      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Поля</CCardHeader>
      <CCardBody>
        <PageFields
          ref="fields"
          v-model="data.values"
          :items="template.fields"
        />
      </CCardBody>
    </CCard>
    <SeoEdit v-model="data" />
    <BtnSave @click="save"> Сохранить </BtnSave>
    <CButton color="danger" class="mb-2" @click="onDelete">Удалить</CButton>
  </div>
</template>

<script>
import EditImage from "@/components/EditImage";
import SectionTagSelect from "@/components/SectionTagSelect";
import PageTemplateSelect from "@/components/PageTemplateSelect";
import PageFields from "@/components/Page/PageFields";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import { required } from "vuelidate/lib/validators";

export default {
  components: {
    EditImage,
    SectionTagSelect,
    PageTemplateSelect,
    PageFields,
  },
  props: {
    isNew: Boolean,
  },
  validations: {
    data: {
      name: {
        required,
      },
      slug: {
        required,
      },
      template: {
        required,
      },
    },
  },
  data() {
    return {
      data: {},
      template: {},
      templateId: "",
      noSlug: false,
    };
  },
  computed: {},
  async created() {
    this.$loading.start();
    await this.fetchData();
    await this.fetchTemplate();
    this.$loading.stop();
  },
  methods: {
    // async fetchSe
    async fetchData() {
      try {
        if (!this.isNew) {
          const { data } = await this.$api.get("sectionPostByIdAdmin", {
            id: this.$route.params.item_id,
          });
          this.data = data;
          const { data: section } = await this.$api.get("sectionByIdAdmin", {
            id: this.$route.params.id,
          });
          this.templateId = section.template;
          if (!data.slug) {
            this.noSlug = true;
          }
        } else {
          const { data } = await this.$api.post("sectionPosts", null, {
            section: this.$route.params.id,
          });
          this.$router.push({
            name: "SectionItem",
            params: { item_id: data._id, id: this.$route.params.id },
          });
          this.data = data;
        }
      } catch (err) {
        this.$error(err);
      }
    },
    async fetchTemplate() {
      try {
        if (!this.templateId) return;
        const { data } = await this.$api.get("pageTemplateById", {
          id: this.templateId,
        });
        this.template = data;
      } catch (err) {
        this.$error(err);
      }
    },
    validate() {
      this.$v.$touch();
      const items = !this.$v.data.name.$error && !this.$v.data.slug.$error;
      return this.$refs.fields.validate() && items;
    },
    async save() {
      if (!this.validate()) {
        this.$notify({
          group: "main",
          title: "Исправьте ошибки!",
          type: "error",
        });
        return;
      }
      try {
        const { data: response } = await this.$api.put(
          "sectionPostById",
          { id: this.data._id },
          this.data
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
        const { data } = await this.$api.delete("sectionPostById", {
          id: this.data._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({
          name: "SectionItems",
          params: { id: this.$route.params.id },
        });
      } catch (err) {
        this.$error(err);
      }
    },
  },
  watch: {
    data: {
      deep: true,
      handler() {
        if (this.data.name && this.noSlug) {
          const name = this.data.name || "";
          const sValue = cyrillicToTranslit().transform(
            name.toLowerCase(),
            "-"
          );
          this.$set(this.data, "slug", sValue);
        }
      },
    },
  },
};
</script>

<style lang="scss">
</style>