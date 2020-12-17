<template>
  <div v-if="!$store.getters.isLoading">
    <!-- <CCard>
      <CCardHeader>Поиск</CCardHeader>
      <CCardBody>
        <h6>Название</h6>
        <CInput v-model="searchPhrase" />
      </CCardBody>
    </CCard> -->

    <!-- <AppPagination
      align="end"
      :activePage.sync="activePage"
      :pages="info.totalPages"
    /> -->
    <CDataTable :items="widgets" :fields="fields" border outlined striped>
      <template #edit="{ item }">
        <td>
          <div class="d-flex">
            <CButton
              color="warning"
              @click="$router.push({ name: item.routeName })"
            >
              <CIcon name="cil-pencil"></CIcon>
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
      widgets: [
        {
          slug: "main_page",
          slugName: '/',
          label: "Главная страница",
          routeName: "WidgetMainPage",
        },
        {
          slug: "faq",
          slugName: 'faq',
          label: "Страница FAQ",
          routeName: "WidgetFaq",
        },
        {
          slug: "contact_page",
          slugName: "contact",
          label: "Страница Контакты",
          routeName: "WidgetContactPage",
        },
        {
          slug: "blog",
          slugName: "blog",
          label: "Страница Блога",
          routeName: "WidgetBlogPage",
        },
        {
          slug: "about_page",
          slugName: 'about',
          label: "Страница  О нас",
          routeName: "WidgetAboutPage",
        },
        {
          slug: "calendar_page",
          slugName: 'calendar',
          label: "Страница Календаря",
          routeName: "WidgetCalendarPage",
        },
        {
          slug: "cart",
          slugName: 'cart',
          label: "Страница Корзина",
          routeName: "WidgetCartPage",
        },
        {
          slug: "checkout",
          slugName: 'checkout',
          label: "Страница Оформление Заказа",
          routeName: "WidgetCheckoutPage",
        },
        {
          slug: "privacy",
          slugName: 'privacy',
          label: "Privacy policy",
          routeName: "WidgetPrivacyPage",
        },
        {
          slug: "terms",
          slugName: 'terms',
          label: "Terms",
          routeName: "WidgetTermsPage",
        },
        {
          slug: "refund-policy",
          slugName: 'refund-policy',
          label: "Refund Policy",
          routeName: "WidgetRefundPolicy",
        },
      ],
      fields: [
        {
          key: "label",
          label: "Название",
        },
        {
          key: "slugName",
          label: "Slug",
        },

        {
          key: "edit",
          label: "Действия",
        },
      ],
    };
  },
  mixins: [ItemsPage],

  methods: {
    async fetchItems() {
      return
      try {
        const resolvers = this.widgets.map(async (widget) => {
          const { data: response } = await this.$api.get("widgetByName", {
            name: widget.slug,
          });
          this.items.push(response);
        });
        await Promise.all(resolvers);
      } catch (err) {
        this.$error(err);
      }
    },
  },
  watch: {},
};
</script>

<style lang="scss" >
</style>