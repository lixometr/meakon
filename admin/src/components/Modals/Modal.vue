<template>
  <div  class="modal-wrapper">
    <div class="modal-header py-3">
      <div class="modal-title">
        <slot name="title">
          <h5>{{title}}</h5>
        </slot>
      </div>
      <CButtonClose @click="close" />
    </div>
    <div class="content p-2 ">
      <slot name="default"></slot>
    </div>
    <div class="py-3 px-3 border-top">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import AInput from "@/components/AInput";
export default {
  props: {
    create: Function,
    put: Function,
    get: Function,
    value: Object,
    title: String,
  },
  data() {
    return {
      item: this.value,
      isLoading: false,
    };
  },
  components: {
    AInput,
  },
  computed: {},

  methods: {
    // async fetch() {
    //   this.isLoading = true;
    //   try {
    //     if (this.new) {
    //     } else {
    //       this.item = await this.get();
    //     }
    //   } catch (err) {
    //     this.$error(err)
    //   }
    //   this.isLoading = false;
    // },
    // async save() {
    //   if (this.isSaving) return;
    //   this.isSaving = true;
    //   try {
    //     if (this.new) {
    //       const result = await this.create(this.item);

    //       console.log(result);
    //     } else {
    //       await this.put(this.item)
    //     }
    //   } catch (err) {
    //     this.$error(err)
    //   }
    //   this.isSaving = false;
    // },
    close() {
      this.$emit("close");
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>

.modal-wrapper {
  overflow: auto;
  max-height: 100%;
  height: 100%;
}
</style>