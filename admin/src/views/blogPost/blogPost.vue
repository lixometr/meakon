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
      <CCardHeader>Редактировать пост</CCardHeader>
      <CCardBody>
        <AInput class="mb-5" label="Заголовок" v-model="data.name" />
        <AInput
          class="mb-5"
          label="Короткий заголовок"
          v-model="data.short_name"
        />
        <AInput class="mb-5" label="Slug" v-model="data.slug" />
        <EditImage class="mb-5" label="Изображение" v-model="data.image" />
        <!-- <PostTagSelect class="mb-5" label="Теги" v-model="data.tags" /> -->
        <EditComponent
          :changeValue.sync="data"
          c="EditMultiplyer"
          v="content"
          :schema="contentSchema"
          :items="contentItems"
        />
        <!-- <ATextArea class="mb-5" label="Контент" v-model="data.content" /> -->
      </CCardBody>
    </CCard>
    <SeoEdit v-model="data" />
    <BtnSave @click="save"> Сохранить </BtnSave>
    <CButton color="danger" class="mb-2" @click="onDelete">Удалить</CButton>
  </div>
</template>

<script>
import AInput from "@/components/AInput";
import NInput from "@/components/NInput";
import ImageUpload from "@/components/ImageUpload";
import EditImage from "@/components/EditImage";
export default {
  components: {
    AInput,
    NInput,
    EditImage,
    ImageUpload,
  },
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      data: {},
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
        const { data } = await this.$api.get("blogPostByIdAdmin", {
          id: this.$route.params.id,
        });
        this.data = data;
      } else {
        const { data } = await this.$api.post("blogPosts");
        this.$router.push({ name: "BlogPost", params: { id: data._id } });
        this.data = data;
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
          "blogPostById",
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
        const { data } = await this.$api.delete("blogPostById", {
          id: this.data._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({ name: "BlogPosts" });
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>