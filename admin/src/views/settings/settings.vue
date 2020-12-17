<template>
  <div v-if="!$store.getters.isLoading">
    <CCardBody>
      <div class="mb-3" v-for="(item, idx) in settings" :key="idx">
        <label for="#">{{ item.name }}</label>
        <CInput
          v-if="item.type === 'input' || !item.type"
          v-model="values[item.slug]"
        />
        <div v-if="item.type === 'select'">
          <v-select
            label="name"
            :options="item.value"
            v-model="values[item.slug]"
            :reduce="(item) => item._id"
          ></v-select>
        </div>
        <div v-if="item.type === 'checkbox'">
          <CInputCheckbox custom :checked.sync="values[item.slug]" />
        </div>
        <div v-if="item.type === 'custom'">
          <component
            :is="item.component"
            v-bind="item.options"
            v-model="values[item.slug]"
          ></component>
        </div>
      </div>
      <CButton color="success" class="mt-2" @click="save()">
        Сохранить
        <CIcon name="cil-save"></CIcon>
      </CButton>
    </CCardBody>
  </div>
</template>

<script>
import SettingMenuItems from "@/components/Settings/SettingMenuItems";
import EditImage from "@/components/EditImage";
import LabelSelect from "@/components/LabelSelect";
export default {
  data() {
    return {
      settings: [
        // {
        //   name: "Каталог",
        //   type: "checkbox",
        //   slug: "showCatalog",
        // },
        // {
        //   name: "Заказы",
        //   type: "checkbox",
        //   slug: "showOrders",
        // },
        // {
        //   name: "Уведомления",
        //   type: "checkbox",
        //   slug: "showNoty",
        // },
        // {
        //   name: "Виджеты",
        //   type: "checkbox",
        //   slug: "showWidgets",
        // },
        // {
        //   name: "Регионы",
        //   type: "checkbox",
        //   slug: "showRegions",
        // },
        // {
        //   name: "Регион по умолчанию",
        //   slug: "region",
        //   type: "select",
        //   value: this.$store.getters["region/regions"],
        // },
        // {
        //   name: "Метка BestSeller",
        //   slug: "best_seller",
        //   type: "custom",
        //   component: "LabelSelect",
        //   options: {
        //     multiple: false,
        //   },
        // },
        // {
        //   name: "Метка Hot Offer",
        //   slug: "hot_offer",
        //   type: "custom",
        //   component: "LabelSelect",
        //   options: {
        //     multiple: false,
        //   },
        // },
      ],
      values: {},
    };
  },
  components: {
    SettingMenuItems,
    EditImage,
    LabelSelect,
  },
  async created() {
    this.$loading.start();
    try {
      const resolvers = this.settings.map(async (setting) => {
        const { data: response } = await this.$api.get("settingByName", {
          name: setting.slug,
        });
        this.$set(this.values, setting.slug, response);
      });
      await Promise.all(resolvers);
    } catch (err) {
      this.$error(err);
    }
    this.$loading.stop();
  },
  methods: {
    async save(index) {
      try {
        const resolvers = this.settings.map(async (setting) => {
          await this.$api.put(
            "settingByName",
            {
              name: setting.slug,
            },
            {
              value: this.values[setting.slug],
            }
          );
        });
        await Promise.all(resolvers);
        this.$notify({
          group: "main",
          type: "success",
          title: "Сохранено!",
        });
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>