<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <div>
          Создан:
          <b>{{ promocode.created_at | moment("DD.MM.YYYY hh:mm") }}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Тексты</CCardHeader>
      <CCardBody>
        <AInput class="mb-3" label="Купон" v-model="promocode.name" />
        <Label class="mb-3" label="Тип скидки">
          <v-select
            :multiple="false"
            v-model="promocode.sale_type"
            :options="saleTypeOptions"
            label="label"
            :reduce="(item) => item.key"
          />
        </Label>
        <div>
          <Label :label="valueLabel"></Label>
          <RegionPrice class="mb-3" v-model="promocode.value" />
        </div>
        <Label label="Кол-во использований (-1 бесконечно">
          <NInput class="mb-3" v-model="promocode.use_count" />
        </Label>

        <Label label="Кол-во использований на аккаунт (-1 бесконечно)">
          <NInput class="mb-3" v-model="promocode.use_user_count" />
        </Label>

        <Label label="Дата окончания купона">
          <DatePicker
            v-model="promocode.end_date"
            :show-second="false"
            type="datetime"
          ></DatePicker>
        </Label>
      </CCardBody>
    </CCard>

    <BtnSave @click="save">Сохранить</BtnSave>
    <CButton color="danger mb-3" @click="onDelete">Удалить</CButton>
  </div>
</template>

<script>
import AInput from "@/components/AInput";
import NInput from "@/components/NInput";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import RegionPrice from "@/components/Product/RegionPrice";
export default {
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      promocode: {
        name: "",
      },
    };
  },

  components: {
    AInput,
    NInput,
    DatePicker,
    RegionPrice,
  },
  computed: {
    valueLabel() {
      const values = {
        percent: "Скидка в %",
        fixed: "Скидка",
      };
      return values[this.promocode.sale_type];
    },
    saleTypeOptions() {
      return [
        {
          key: "percent",
          label: "Процент скидки",
        },
        {
          key: "fixed",
          label: "Фиксированая скидка на сумму в корзине",
        },
      ];
    },
  },
  async created() {
    this.$loading.start();

    try {
      if (!this.isNew) {
        const { data } = await this.$api.get("promocodeByIdAdmin", {
          id: this.$route.params.id,
        });
        this.promocode = data;
        if (!this.promocode.sale_type) {
          this.$set(this.promocode, "sale_type", this.saleTypeOptions[0].key);
        }
        if(!this.promocode.use_count) {
          this.$set(this.promocode, "use_count", -1);
        }
        if(!this.promocode.use_user_count) {
          this.$set(this.promocode, "use_user_count", -1);
        }
      } else {
        const { data } = await this.$api.post("promocodes");
        this.$router.push({ name: "Promocode", params: { id: data._id } });
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
          "promocodeById",
          { id: this.promocode._id },
          this.promocode
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
        const { data } = await this.$api.delete("promocodeById", {
          id: this.promocode._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({ name: "Promocodes" });
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>