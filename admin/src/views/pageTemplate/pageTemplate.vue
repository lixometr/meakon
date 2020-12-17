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
      <CCardHeader>Редактировать шаблон</CCardHeader>
      <CCardBody>
        <AInput
          :isValid="$v.data.name.$error ? false : undefined"
          class="mb-3"
          label="Название"
          v-model="data.name"
        />
        <AInput
          class="mb-5"
          label="Slug"
          :isValid="$v.data.slug.$error ? false : undefined"
          v-model="data.slug"
          @input="noSlug = false"
        />
        <PageTemplateFields ref="fields" v-model="data.fields" />
        <!-- <ATextArea class="mb-5" label="Контент" v-model="data.content" /> -->
      </CCardBody>
    </CCard>
    <BtnSave @click="save"> Сохранить </BtnSave>
    <CButton color="danger" class="mb-2" @click="onDelete">Удалить</CButton>
  </div>
</template>

<script>
import AInput from "@/components/AInput";
import PageTemplateFields from "@/components/PageTemplate/PageTemplateFields";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import { required } from "vuelidate/lib/validators";

export default {
  components: {
    AInput,
    PageTemplateFields,
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
    },
  },
  data() {
    return {
      data: {},
      noSlug: false,
    };
  },
  computed: {
    horizontal() {
      return this.$store.getters.horizontal;
    },
    contentItems() {
      return [
        {
          c: "AInput",
          v: "anchor",
          label: "Якорь",
        },
        {
          c: "ATextArea",
          v: "text",
          label: "Текст",
        },
      ];
    },
    contentSchema() {
      return {
        content: [
          {
            anchor: "",
            text: "",
          },
        ],
      };
    },
  },
  async created() {
    this.$loading.start();
    try {
      if (!this.isNew) {
        const { data } = await this.$api.get("pageTemplateByIdAdmin", {
          id: this.$route.params.id,
        });
        if (!data.slug) {
          this.noSlug = true;
        }
        this.data = data;
      } else {
        const { data } = await this.$api.post("pageTemplates");
        this.$router.push({ name: "PageTemplate", params: { id: data._id } });
        this.data = data;
      }
    } catch (err) {
      this.$error(err);
    }

    this.$loading.stop();
  },
  methods: {
    validate() {
      return this.$refs.fields.validate();
    },
    async save() {
      const isValid = this.validate();
      if (!isValid) {
        this.$notify({
          group: "main",
          title: "Исправьте ошибки!",
          type: "error",
        });
        return;
      }
      try {
        const { data: response } = await this.$api.put(
          "pageTemplateById",
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
        const { data } = await this.$api.delete("pageTemplateById", {
          id: this.data._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({ name: "PageTemplates" });
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