<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <div>
          Создан:
          <b>{{attribute.created_at | moment('DD.MM.YYYY hh:mm')}}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Тексты</CCardHeader>
      <CCardBody>
        <AInput class="mb-5" label="Название" v-model="attribute.name" />
        <AInput class="mb-5" label="Slug" v-model="attribute.slug" />
      </CCardBody>
    </CCard>
 
    <CCard>
      <CCardHeader>Значения</CCardHeader>
      <CCardBody>
        <CDataTable :items="values" :fields="valueFields" hover>
          <template #actions="{item}">
            <td>
              <CButton color="danger" class="mr-2" @click="deleteValue(item)">
                <CIcon name="cil-trash"></CIcon>
              </CButton>
              <CButton color="warning" @click="editValue(item)">
                <CIcon name="cil-pencil"></CIcon>
              </CButton>
            </td>
          </template>
        </CDataTable>
        <CButton color="primary" @click="addValue">
          Добавить значение
          <CIcon class="ml-1" name="cib-addthis" />
        </CButton>
      </CCardBody>
    </CCard>

    <BtnSave @click="save">Сохранить</BtnSave>
    <CButton color="danger" @click="onDelete">Удалить</CButton>
  </div>
</template>

<script>
import NInput from "@/components/NInput";
import ImageUpload from "@/components/ImageUpload";
import AttrValueModal from "@/components/AttrValueModal";
import Label from "@/components/Label";
export default {
  components: {
    NInput,
    ImageUpload,
    Label,
  },
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      attribute: {},
      values: [],
    };
  },
  computed: {
    horizontal() {
      return this.$store.getters.horizontal;
    },
   
    valueFields() {
      return [
        { key: "actions", label: "Действия" },
        {
          key: "name",
          label: "Название",
        },
        {
          key: "slug",
        },
      ];
    },
  },
  async created() {
    this.$loading.start();
    try {
      if (!this.isNew) {
        const { data: attribute } = await this.$api.get("attributeByIdAdmin", {
          id: this.$route.params.id,
        });
        this.attribute = attribute;
        await this.fetchValues();
      } else {
        const { data } = await this.$api.post("attributes");
        this.$router.push({ name: "Attribute", params: { id: data._id } });
        this.attribute = data;
      }
    } catch (err) {
      this.$error(err);
    }

    this.$loading.stop();
  },
  methods: {
    async fetchValues() {
      const { data: values } = await this.$api.get("attributeByIdValues", {
        id: this.$route.params.id,
      });
      console.log(values)
      this.values = values;
    },
    async deleteValue(item) {
      try {
        const { data: result } = await this.$api.delete("attributeValueById", {
          id: item._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        await this.fetchValues();
      } catch (err) {
        this.$error(err);
      }
    },
    editValue(item) {
      this.$modal.show(
        AttrValueModal,
        { id: item._id, attributeId: this.attribute._id },
        { height: "100%", width: "100%" }
      );
    },
    async addValue() {
      this.$modal.show(
        AttrValueModal,
        { new: true, attributeId: this.attribute._id },
        { height: "100%", width: "100%" }
      );
    },
    async save() {
      try {
        const { data: response } = await this.$api.put(
          "attributeById",
          { id: this.attribute._id },
          this.attribute
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
        const { data } = await this.$api.delete("attributeById", {
          id: this.attribute._id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({ name: "Attributes" });
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>