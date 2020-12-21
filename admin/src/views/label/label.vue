<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <div>
          Создан:
          <b>{{ label.created_at | moment("DD.MM.YYYY hh:mm") }}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader></CCardHeader>
      <CCardBody>
        <AInput class="mb-5" label="Название" v-model="label.name" />
        <AInput class="mb-5" label="Slug" v-model="label.slug" />
      </CCardBody>
    </CCard>
    <BtnSave @click="save">Сохранить</BtnSave>
    <CButton color="danger" class="mb-2" @click="onDelete">Удалить</CButton>
  </div>
</template>

<script>
import NInput from "@/components/NInput";
export default {
  components: {
    NInput,
  },
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      label: {
        name: '',
        slug: '',

      },
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
        const { data } = await this.$api.get("labelByIdAdmin", {
          id: this.$route.params.id,
        });
        this.label = data;
      } else {
        const { data } = await this.$api.post("labels");
        this.$router.push({ name: "Label", params: { id: data._id } });
        this.label = data;
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
          "labelById",
          { id: this.label._id },
          this.label
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
        const { data } = await this.$api.delete("labelById", {
          id: this.label._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({ name: "Labels" });
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>