<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <div>
          Создан:
          <b>{{ order.created_at | moment("DD.MM.YYYY hh:mm") }}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardBody>
        <Label class="mb-3" label="Id">{{ order.order_id }}</Label>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <Label class="mb-3" label="Сумма"
          >{{ order.region.currency }}{{ order.total_price }}</Label
        >
        <Label class="mb-3" label="Статус">
          <v-select
            :multiple="false"
            v-model="order.status"
            :options="statuses"
            label="label"
            :reduce="(item) => item.key"
            :searchable="false"
        /></Label>
        <Label class="mb-3" label="Промокод">{{
          order.promocode && order.promocode.name
        }}</Label>
        <Label class="mb-3" label="Способ оплаты">{{
          order.payment_method
        }}</Label>
        <Label label="Регион">{{ order.region.name }}</Label>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Информация о товарах</CCardHeader>
      <CCardBody>
        <OrderProduct
          v-for="(item, idx) in order.products"
          :key="idx"
          :item="item"
          :order="order"
        />
      </CCardBody>
    </CCard>

    <CCard>
      <CCardHeader>Информация о пользователе</CCardHeader>
      <CCardBody>
        <Label class="mb-3" label="Email">{{ order.info.email }}</Label>
        <Label class="mb-3" label="Имя">{{ order.info.first_name }}</Label>
        <Label class="mb-3" label="Фамилия">{{ order.info.last_name }}</Label>
        <Label class="mb-3" label="Телефон">{{ order.info.phone }}</Label>
        <Label class="mb-3" label="Страна">{{ order.info.country }}</Label>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Информация о персонаже</CCardHeader>
      <CCardBody>
        <Label class="mb-3" label="Имя персонажа">{{
          order.character.character_name
        }}</Label>
        <Label class="mb-3" label="Сервер">{{
          order.character.server_name
        }}</Label>
        <Label class="mb-3" label="Battle tag">{{
          order.character.battle_tag
        }}</Label>
        <Label class="mb-3" label="Фракция">{{
          order.character.fraction
        }}</Label>
        <Label class="mb-3" label="Armory Link">{{
          order.character.armory_link
        }}</Label>
      </CCardBody>
    </CCard>

    <CCard v-if="order.additional_info">
      <CCardHeader>Доп информация</CCardHeader>
      <CCardBody>
        <Label label="">{{ order.additional_info }}</Label>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardBody>
        <Label label=""></Label>
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
import Product from "@/../../common/models/product";
import OrderProduct from "@/components/Order/OrderProduct";
export default {
  components: {
    AInput,
    NInput,
    ImageUpload,
    CategorySelect,
    EditImage,
    AppColorPicker,
    OrderProduct,
  },
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      order: {
        name: "",
      },
    };
  },
  computed: {
    statuses() {
      return [
        {
          label: "CANCELLED",
          key: 0,
        },
        {
          label: "COMPLETED",
          key: 1,
        },
        {
          label: "IN PROGRESS",
          key: 2,
        },
        {
          label: "NEW ORDER",
          key: 3,
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
        const { data } = await this.$api.get("orderByIdAdmin", {
          id: this.$route.params.id,
        });
        this.order = data;
      } else {
        const { data } = await this.$api.post("orders");
        this.$router.push({ name: "Order", params: { id: data._id } });
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
          "orderChangeStatus",
          { id: this.order._id },
          {
            status: this.order.status,
          }
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
        const { data } = await this.$api.delete("orderById", {
          id: this.order._id,
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