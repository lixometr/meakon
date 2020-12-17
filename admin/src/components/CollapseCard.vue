<template>
  <CCard>
    <CCardHeader class="cursor-pointer" @click="toggle"><slot name="header" /></CCardHeader>
    <CCollapse :show="isOpen">
      <CCardBody>
        <slot name="default"></slot>
      </CCardBody>
    </CCollapse>
  </CCard>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isOpen: this.open,
    };
  },
  methods: {
    toggle() {
      if (this.isOpen) {
        this.isOpen = false;
        this.$emit("close");
      } else {
        this.isOpen = true;
        this.$emit("open");
      }
    },
  },
  watch: {
    open() {
      this.isOpen = this.open;
    },
  },
};
</script>

<style>
</style>