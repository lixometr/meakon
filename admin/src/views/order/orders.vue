<template>
  <div v-if="!$store.getters.isLoading">
    <!-- <CCard>
      <CCardHeader>Поиск</CCardHeader>
      <CCardBody>
        <h6>Название</h6>
        <CInput v-model="searchPhrase" />
      </CCardBody>
    </CCard> -->
    <!-- <BtnAdd @click="$router.push({name: 'OrderNew'})">Добавить категорию</BtnAdd> -->
    <AppPagination :pages="info.totalPages" :activePage.sync="activePage" />

    <CCardBody>
      <CDataTable :items="items" :fields="fields" border outlined striped>
        <template #edit="{ item }">
          <td>
            <div class="d-flex">
              <CButton
                color="warning"
                @click="
                  $router.push({ name: 'Order', params: { id: item._id } })
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

        <template #first_name="{ item }">
          <td>
            {{ item.info.first_name }}
          </td>
        </template>
        <template #region="{ item }">
          <td>
            {{ item.region.name }}
          </td>
        </template>
        <template #email="{ item }">
          <td>
            {{ item.info.email }}
          </td>
        </template>
        <template #total_price="{ item }">
          <td>{{ item.region.currency }}{{ item.total_price }}</td>
        </template>
        <template #status="{ item }">
          <td>
            {{ itemStatus(item.status) }}
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
      fetchRoute: "orders",
      removeRoute: "orderById",
      searchPhrase: "",
      fields: [
        {
          key: "region",
        },
        {
          key: "order_id",
          label: "Id заказа",
        },

        {
          key: "status",
          label: "Статус заказа",
        },
        {
          key: "total_price",
          label: "Цена",
        },
       
        {
          key: "edit",
          label: "Действия",
        },
      ],
    };
  },
  computed: {
    itemStatus() {
      const statuses = {
        1: 'Завершен',
        2: 'В процессе',
        0: 'Отменен',
        3: 'Новый заказ'
      }
        return status => {
          return statuses[status]
        }
    }
  },

  methods: {},
};
</script>

<style lang="scss" >
</style>