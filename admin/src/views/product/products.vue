<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardBody>
        <!-- <div class="mb-3">
          <h6 class="mb-2">Категория</h6>
          <CategorySelect
            inputClass="bg-white"
            class="mb-2"
            v-model="filters.category"
            :multiple="false"
          />
        </div> -->
        <h6 class="mb-2">Поиск</h6>
        <CInput v-model="searchPhrase" />
      </CCardBody>
    </CCard>

    <BtnAdd @click="$router.push({ name: 'ProductNew' })"
      >Добавить товар</BtnAdd
    >

    <CCardBody>
      <AppPagination
        align="end"
        :activePage.sync="activePage"
        :pages="info.totalPages"
      />
      <CDataTable
        :items="items"
        :fields="fields"
        border
        outlined
        striped
      >
        <template #edit="{ item }">
          <td>
            <div class="d-flex">
              <CButton
                color="warning"
                class="mr-2"
                @click="
                  $router.push({ name: 'Product', params: { id: item._id } })
                "
              >
                <CIcon name="cil-pencil"></CIcon>
              </CButton>
              <CButton color="danger" @click="removeItem(item._id)">
                <CIcon name="cil-trash"></CIcon>
              </CButton>
            </div>
          </td>
        </template>

        <!-- <template #check="{item}">
          <td>
            <CInputCheckbox custom :checked.sync="selectedItems[item._id]" />
          </td>
        </template>
        <template #check-header>
          <td>
            <CInputCheckbox custom :checked.sync="selectedItems['all']" />
          </td>
        </template>-->
        <template #default_image="{ item }">
          <td>
            <CImg :src="item.default_image.url" width="80px" />
          </td>
        </template>

        <template #old_price="{ item }">
          <td>
            <div v-for="(priceItem, idx) in item.old_price" :key="idx">
              {{ getRegionById(priceItem.region).currency
              }}{{ priceItem.value }}
            </div>
          </td>
        </template>
        <template #price="{ item }">
          <td>
            <div v-for="(priceItem, idx) in item.price" :key="idx">
              {{ getRegionById(priceItem.region).currency
              }}{{ priceItem.value }}
            </div>
          </td>
        </template>
        <template #category="{ item }">
          <td>
            <span class="d-block" v-for="cat in item.category" :key="cat._id">{{
              cat.name
            }}</span>
          </td>
        </template>
        <template #created_at="{ item }">
          <td>{{ item.created_at | moment("DD.MM.YYYY HH:MM") }}</td>
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
      fetchRoute: "productsSearch",
      removeRoute: "productById",
      searchPhrase: "",
      fields: [
        // {
        //   key: "check",
        // },
        // {
        //   key: "_id"
        // },
        {
          key: "default_image",
          label: "Изображение"
        },
        {
          key: "name", 
          label: "Название" 
        },
        {
          key: "slug",
        },

        {
          key: "price",
          label: "Цена",
        },
        {
          key: "old_price",
          label: "Старая цена",
        },
        {
          key: "category",
          label: "Категории",
        },

        {
          key: "created_at",
          label: "Создан",
        },
        {
          key: "edit",
          label: "Действия",
        },
      ],
    };
  },
  components: {},

  computed: {},
  methods: {
    getRegionById(id) {
      const regions = this.$store.getters["region/regions"];
      let region = regions.find((reg) => reg._id === id);
      return region || {};
    },
  },
  watch: {},
};
</script>

<style lang="scss" >
</style>