<template>
  <div v-if="!$store.getters.isLoading">
    <BtnAdd @click="$router.push({ name: 'NotyNew' })"
      >Добавить уведомление</BtnAdd
    >
    <AppPagination :pages="info.totalPages" :activePage.sync="activePage" />

    <CDataTable :items="items" :fields="fields" border outlined striped>
      <template #edit="{ item }">
        <td>
          <div class="d-flex">
            <CButton
              color="warning"
              @click="$router.push({ name: 'Noty', params: { id: item._id } })"
            >
              <CIcon name="cil-pencil"></CIcon>
            </CButton>
            <CButton color="danger" class="ml-2" @click="removeItem(item._id)">
              <CIcon name="cil-trash"></CIcon>
            </CButton>
          </div>
        </td>
      </template>
      <template #date="{ item }">
        <td>
          {{ $moment(item.date).format("DD.MM.YYYY") }}
        </td>
      </template>
    </CDataTable>
  </div>
</template>

<script>
import ItemsPage from "@/mixins/ItemsPage";

export default {
  mixins: [ItemsPage],

  data() {
    return {
      fetchRoute: "notys",
      removeRoute: "notyById",
      fields: [
        {
          key: "date",
          label: "Дата",
        },
        {
          key: "text",
          label: "Текст",
        },
        {
          key: "edit",
          label: "Действия",
        },
      ],
    };
  },

  methods: {},
};
</script>

<style lang="scss" >
</style>