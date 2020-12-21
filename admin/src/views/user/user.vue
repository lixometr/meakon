<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <div>
          Создан:
          <b>{{ user.created_at | moment("DD.MM.YYYY hh:mm") }}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardBody>
        <Label class="mb-3" label="Id">{{ user._id }}</Label>
        <Label label="Подтвержден">
          <v-select
            :multiple="false"
            v-model="user.is_confirmed"
            :options="confirmes"
            label="label"
            :reduce="(item) => item.key"
            :searchable="false"
        /></Label>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Данные</CCardHeader>
      <CCardBody>
        <AInput class="mb-3" label="Email" v-model="user.email" />
        <AInput class="mb-3" label="Имя" v-model="user.first_name" />
        <AInput class="mb-3" label="Фамилия" v-model="user.last_name" />
        <AInput class="mb-3" label="Телефон" v-model="user.phone" />
        <AInput class="mb-3" label="Страна" v-model="user.country" />
      </CCardBody>
    </CCard>

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
      user: {
        name: "",
      },
    };
  },
  computed: {
    confirmes() {
      return [
        {
          label: "Да",
          key: true,
        },
        {
          label: "Нет",
          key: false,
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
        const { data } = await this.$api.get("userByIdAdmin", {
          id: this.$route.params.id,
        });
        this.user = data;
      } else {
        const { data } = await this.$api.post("users");
        this.$router.push({ name: "User", params: { id: data._id } });
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
          "userById",
          { id: this.user._id },
          this.user
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
        const { data } = await this.$api.delete("userById", {
          id: this.user._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({ name: "Users" });
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>