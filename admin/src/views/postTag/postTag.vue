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
      <CCardHeader>Редактировать тег</CCardHeader>
      <CCardBody>
        <AInput class="mb-5" label="Заголовок" v-model="data.name" />
       
        <AInput class="mb-5" label="Slug" v-model="data.slug" />
      
      </CCardBody>
    </CCard>
    <BtnSave @click="save"> Сохранить </BtnSave>
    <CButton color="danger" class="mb-2" @click="onDelete">Удалить</CButton>
  </div>
</template>

<script>
import AInput from "@/components/AInput";
import NInput from "@/components/NInput";
import ImageUpload from "@/components/ImageUpload";
import EditImage from "@/components/EditImage";
import SectionTagSelect from "@/components/SectionTagSelect";
export default {
  components: {
    AInput,
    NInput,
    EditImage,
    ImageUpload,
    SectionTagSelect,
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

  },
  async created() {
    this.$loading.start();
    try {
      if (!this.isNew) {
        const { data } = await this.$api.get("postTagByIdAdmin", {
          id: this.$route.params.id,
        });
        this.data = data;
      } else {
        const { data } = await this.$api.post("postTags");
        this.$router.push({ name: "PostTag", params: { id: data._id } });
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
          "postTagById",
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
        const { data } = await this.$api.delete("postTagById", {
          id: this.data._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({ name: "postTags" });
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>