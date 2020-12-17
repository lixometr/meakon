<template>
  <Modal title="Редактировать тег" @close="$emit('close')">
    <template>
      <CCard>
        <CCardBody>
          <AInput class="mb-4" label="Название" v-model="name" />
          <AInput label=" Slug" v-model="slug" />
        </CCardBody>
      </CCard>
    </template>
    <template #footer>
      <div class="d-flex align-items-center">
        <CButton color="secondary">Отменить</CButton>
        <CButton color="success" class="mb-0 ml-2 w-100" @click="save"
          >Сохранить</CButton
        >
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "./Modal";
export default {
  props: {
    isNew: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      name: "",
      slug: "",
    };
  },
  components: {
    Modal,
  },
  methods: {
    async save() {
      try {
        if (this.isNew) {
          const { data } = await this.$api.post("sectionTags", null, {
            slug: this.slug,
            name: this.name,
          });
          this.$notify({
            group: "main",
            type: "success",
            title: "Тег создан!",
          });
          this.$emit('close')
        }
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style>
</style>