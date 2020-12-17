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
      <CCardHeader>Редактировать уведомление</CCardHeader>
      <CCardBody>
        <AInput class="mb-3" label="Текст" v-model="data.text" />
        <AInput class="mb-3" label="Ссылка" v-model="data.link" />
        <Label label="Дата">
          <DatePicker
            v-model="data.date"
            :show-second="false"
            type="date"
          ></DatePicker>
        </Label>
      </CCardBody>
    </CCard>
    <BtnSave @click="save"> Сохранить </BtnSave>
    <CButton color="danger" class="mb-2" @click="onDelete">Удалить</CButton>
  </div>
</template>

<script>
import AInput from "@/components/AInput";
import NInput from "@/components/NInput";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  components: {
    AInput,
    NInput,
    DatePicker,
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
        const { data } = await this.$api.get("notyByIdAdmin", {
          id: this.$route.params.id,
        });
        this.data = data;
        if(this.data.date) {
          this.data.date = new Date(this.data.date)
        }
      } else {
        const { data } = await this.$api.post("notys");
        this.$router.push({ name: "Noty", params: { id: data._id } });
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
          "notyById",
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
        const { data } = await this.$api.delete("notyById", {
          id: this.data._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({ name: "Notys" });
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>