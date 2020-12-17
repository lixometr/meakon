<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Поиск</CCardHeader>
      <CCardBody>
        <h6>Название</h6>
        <CInput v-model="searchPhrase" />
      </CCardBody>
    </CCard>
    <BtnAdd @click="$router.push({name: 'AttributeNew'})">Добавить атрибут</BtnAdd>
    <AppPagination :pages="info.totalPages" :activePage.sync="activePage" />

    <CDataTable :items="items" :fields="fields" border outlined striped>
      <template #edit="{item}">
        <td>
          <div class="d-flex">
            <CButton
              color="warning"
              @click="$router.push({name: 'Attribute', params: {id: item._id}})"
            >
              <CIcon name="cil-pencil"></CIcon>
            </CButton>
            <CButton color="danger" class="ml-2" @click="removeItem(item._id)">
              <CIcon name="cil-trash"></CIcon>
            </CButton>
          </div>
        </td>
      </template>
    </CDataTable>
  </div>
</template>

<script>
import ItemsPage from "@/mixins/ItemsPage";
export default {
  data() {
    return {
      fetchRoute: "attributesSearch",
      removeRoute: "attributeById",
      fields: [
        {
          key: "name",
          label: "Название",
        },
        {
          key: "slug",
        },
        
        {
          key: "edit",
          label: "Действия",
        },
      ],
    };
  },
  mixins: [ItemsPage],

  methods: {},
};
</script>

<style lang="scss" >
</style>