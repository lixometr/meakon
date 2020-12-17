<template>
  <div v-if="!$store.getters.isLoading">
    <CCard v-for="(block, idx) in blocks" :key="idx">
      <CCardHeader>Блок {{ idx + 1 }}</CCardHeader>
      <CCardBody>
        <EditComponent
          v-for="(item, idx) in block"
          :key="idx"
          v-bind="item"
          :changeValue.sync="values"
          :schema="schema"
        />
      </CCardBody>
    </CCard>

    <SeoEdit v-model="values" />
  </div>
</template>

<script>
import AInput from "@/components/AInput";
import EditImage from "@/components/EditImage";
import merge from "lodash.merge";
import EditComponent from "@/components/Edit/EditComponent";
import SeoEdit from "@/components/Edit/SeoEdit";
export default {
  data() {
    return {
      schema: {},
      values: {},
    };
  },
  computed: {
    blocks() {
      return [
        this.block1C,
        this.block2C,
        this.block3C,
        this.block4C,
        this.block5C,
        this.block6C,
        this.block7C,
      ];
    },

    block7C() {
      return [
        {
          c: "AInput",
          v: "block7.title",
          label: "Заголовок",
        },
      ];
    },
    block6C() {
      return [
        {
          c: "AInput",
          v: "block6.title",
          label: "Заголовок",
        },
        {
          c: "EditMultiplyer",
          v: "block6.items",
          label: "Отзывы",
          items: [
            {
              v: "login",
              c: "AInput",
              label: "Логин",
            },
            {
              v: "text",
              c: "AInput",
              label: "Текст",
            },
            {
              v: "avatar",
              c: "EditImage",
              label: "Аватар",
            },
            {
              v: "link",
              c: "AInput",
              label: "Ссылка",
            },
            {
              v: "stars",
              c: "AInput",
              label: "Кол-во звезд",
            },
          ],
        },
      ];
    },
    block5C() {
      return [
        {
          c: "AInput",
          v: "block5.title",
          label: "Заголовок",
        },
        {
          c: "AInput",
          v: "block5.sub_title",
          label: "Подзаголовок",
        },

        {
          c: "EditImage",
          v: "block5.video_preview",
          label: "Видео превью",
        },
        {
          c: "AInput",
          v: "block5.video_url",
          label: "Ссылка на видео (youtube)",
        },
        {
          c: "EditMultiplyer",
          v: "block5.items",
          label: "Элементы",
          items: [
            {
              v: "title",
              c: "AInput",
              label: "Заголовок",
            },
            {
              v: "sub_title",
              c: "AInput",
              label: "Подзаголовок",
            },
          ],
        },
      ];
    },
    block4C() {
      return [
        {
          c: "AInput",
          v: "block4.title",
          label: "Заголовок",
        },
        {
          c: "EditOffset",
        },
        {
          c: "EditMultiplyer",
          v: "block4.items",
          label: "Элементы",
          items: [
            {
              v: "title",
              c: "AInput",
              label: "Заголовок",
            },
            {
              v: "sub_title",
              c: "AInput",
              label: "Подзаголовок",
            },

            {
              v: "icon",
              c: "EditImage",
              label: "Иконка",
            },
            {
              v: "bg_image",
              c: "EditImage",
              label: "Фоновая картинка",
            },
          ],
        },
      ];
    },
    block3C() {
      return [
        {
          c: "AInput",
          v: "block3.title",
          label: "Заголовок",
        },
      ];
    },
    block2C() {
      return [
        {
          c: "AInput",
          v: "block2.title",
          label: "Заголовок",
        },
      ];
    },
    block1C() {
      return [
        {
          c: "EditMultiplyer",
          v: "block1.items",
          label: "Слайдер",
          items: [
            {
              v: "title",
              c: "AInput",
              label: "Заголовок",
            },
            {
              v: "sub_title",
              c: "AInput",
              label: "Подзаголовок",
            },
            {
              v: "btn",
              c: "AInput",
              label: "Кнопка",
            },
            {
              v: "btn_url",
              c: "AInput",
              label: "Ссылка в кнопке",
            },
            {
              v: "img",
              c: "EditImage",
              label: "Изображение",
            },
            {
              v: "img_mob",
              c: "EditImage",
              label: "Изображение (мобильное)",
            },
          ],
        },
      ];
    },
  },
  components: {
    AInput,
    EditImage,
    EditComponent,
    SeoEdit,
  },
  async created() {
    this.$loading.start();
    await this.fetchItem();
    this.$loading.stop();
  },
  methods: {
    async save() {
      return this.$api.put(
        "widgetByName",
        { name: "main_page" },
        { values: this.values }
      );
    },
    async fetchItem() {
      try {
        const { data } = await this.$api.get("widgetByNameAdmin", {
          name: "main_page",
        });
        const values = data.values || {};
        this.schema = data.schema || {};
        this.values = merge({}, this.values, values);
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>