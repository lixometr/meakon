<template>
  <div v-if="!$store.getters.isLoading">
    <CButton color="primary" @click="addItem">
      Добавить регион
      <CIcon class="ml-1" name="cib-addthis" />
    </CButton>
    <CCardBody>
      <CDataTable :items="regions" :fields="fields" hover>
        <template #edit="{item, index}">
          <td class="d-flex">
            <CButton color="danger" @click="deleteItem(index)">
              <CIcon name="cil-trash"></CIcon>
            </CButton>
            <CButton color="success" class="ml-2" @click="saveItem(index)" v-if="item.isChanged">
              <CIcon name="cil-save"></CIcon>
            </CButton>
          </td>
        </template>
        <template #name="{item, index}">
          <td>
            <CInput v-model="item.name" @input="changeProp($event, index)" />
          </td>
        </template>
        <template #currency="{item, index}">
          <td>
            <CInput v-model="item.currency" @input="changeProp($event, index)" />
          </td>
        </template>
        <template #iso_currency="{item, index}">
          <td>
            <CInput v-model="item.iso_currency" @input="changeProp($event, index)" />
          </td>
        </template>
        <template #slug="{item, index}">
          <td>
            <CInput v-model="item.slug" @input="changeProp($event, index)" />
          </td>
        </template>
     
      </CDataTable>
    </CCardBody>
  </div>
</template>

<script>
import NInput from "@/components/NInput"
import AInput from "@/components/AInput"
export default {
  data() {
    return {
      regions: [],
      fields: [
        {
          key: "edit",
          label: "Действия",
        },
        {
          key: "name",
          label: "Название",
        },
        {
          key: "currency",
          label: "Валюта",
        },
        {
          key: "iso_currency",
          label: "Валюта ISO",
        },
        {
          key: "slug",
        },
      
      ],
    };
  },
  components: {
  },
  async created() {
    this.$loading.start();
    try {
      const { data: regions } = await this.$api.get("regionsAdmin");
      this.regions = regions;
    } catch (err) {
      this.$error(err);
    }
    this.$loading.stop();
  },
  methods: {
    changeProp(newValue, index) {
      if (!this.regions[index]) this.regions[index] = {};
      this.$set(this.regions[index], "isChanged", true);
    },
    async addItem() {
      try {
        const { data: response } = await this.$api.post("regions");
        this.regions.push(response);
      } catch (err) {
        this.$error(err);
      }
    },
    async saveItem(index) {
      try {
        const item = this.regions[index];
        const { data: response } = await this.$api.put(
          "regionById",
          { id: item._id },
          item
        );
        this.$notify({
          group: "main",
          type: "success",
          title: "Сохранено!",
        });
        this.$set(this.regions[index], "isChanged", false);
      } catch (err) {
        this.$error(err);
      }
    },
    async deleteItem(index) {
      try {
        const item = this.regions[index];
        const { data: response } = await this.$api.delete(
          "regionById",
          { id: item._id },
          item
        );
        this.$notify({
          group: "main",
          type: "success",
          title: "Удалено!",
        });
        this.regions.splice(index, 1);
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>