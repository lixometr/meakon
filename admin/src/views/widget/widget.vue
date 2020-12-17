<template>
  <div>
    <!-- <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody> </CCardBody>
    </CCard> -->
    <router-view ref="widget"></router-view>
    <BtnSave @click="save">Сохранить</BtnSave>
  </div>
</template>

<script>
import AInput from "@/components/AInput";
import NInput from "@/components/NInput";
import EditImage from "@/components/EditImage";
export default {
  components: {
    AInput,
    NInput,
    EditImage,
  },

  data() {
    return {};
  },
  computed: {
    horizontal() {
      return this.$store.getters.horizontal;
    },
  },
 

  methods: {
    async save() {
      try {
        const { data } = await this.$refs.widget.save();
        if (data.ok) {
          this.$notify({
            group: "main",
            title: "Сохранено!",
            type: "success",
          });
        }
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>