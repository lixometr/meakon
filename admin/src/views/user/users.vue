<template>
  <div v-if="!$store.getters.isLoading">
    <!-- <CCard>
      <CCardHeader>Поиск</CCardHeader>
      <CCardBody>
        <h6>Название</h6>
        <CInput v-model="searchPhrase" />
      </CCardBody>
    </CCard> -->
    <AppPagination :pages="info.totalPages" :activePage.sync="activePage" />

    <CCardBody>
      <CDataTable :items="items" :fields="fields" border outlined striped>
        <template #edit="{ item }">
          <td>
            <div class="d-flex">
              <CButton
                color="warning"
                @click="
                  $router.push({ name: 'User', params: { id: item._id } })
                "
              >
                <CIcon name="cil-pencil"></CIcon>
              </CButton>
              <CButton
                color="danger"
                class="ml-2"
                @click="removeItem(item._id)"
              >
                <CIcon name="cil-trash"></CIcon>
              </CButton>
            </div>
          </td>
        </template>

        <template #image="{ item }">
          <td>
            <CImg :src="item.image.url" width="150px" />
          </td>
        </template>
        <template #is_confirmed="{ item }">
          <td>
           {{item.is_confirmed ? 'да' : 'нет'}}
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </div>
</template>

<script>
import ItemsPage from "@/mixins/ItemsPage";

export default {
  mixins: [ItemsPage],
  data() {
    return {
      fetchRoute: "users",
      removeRoute: "userById",
      searchPhrase: "",
      fields: [
        {
          key: "email",
        },
        {
          key: "first_name",
          label: "Имя"
        },

        {
          key: "last_name",
          label: "Фамилия"
        },
        {
          key: "is_confirmed",
          label: "Подтвержден"
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