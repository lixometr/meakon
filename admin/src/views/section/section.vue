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
      <CCardHeader>Редактировать раздел</CCardHeader>
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
        <PageTemplateSelect
          :class="{ 'vue-select-error': $v.data.template.$error }"
          label="Шаблон"
          class="mb-3"
          v-model="templateId"
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
import PageTemplateSelect from "@/components/PageTemplateSelect";
import PageFields from "@/components/Page/PageFields";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import { required } from "vuelidate/lib/validators";

export default {
  components: {
    EditImage,
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
    this.$loading.stop();
  },
  methods: {
    async fetchData() {
      try {
        if (!this.isNew) {
          const { data } = await this.$api.get("sectionByIdAdmin", {
            id: this.$route.params.id,
          });
          this.data = data;
          this.templateId = this.data.template;
          if (!data.slug) {
            this.noSlug = true;
          }
        } else {
          const { data } = await this.$api.post("sections");
          this.$router.push({ name: "Section", params: { id: data._id } });
          this.data = data;
        }
      } catch (err) {
        this.$error(err);
      }
    },

    validate() {
      this.$v.$touch();
      const items = !this.$v.data.name.$error && !this.$v.data.slug.$error;
      return items
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
          "sectionById",
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
        const { data } = await this.$api.delete("sectionById", {
          id: this.data._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({ name: "Sections" });
      } catch (err) {
        this.$error(err);
      }
    },
  },
  watch: {
    templateId(newVal, prevVal) {
      this.$set(this.data, "template", this.templateId);
    },
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