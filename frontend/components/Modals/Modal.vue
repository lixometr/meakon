<template>
  <transition name="modal-fade">
    <div class="modal-wrapper" v-if="show">
      <div class="modal-inner" :class="modalClass">
        <components
          :is="activeModal"
          v-bind="cProps"
          v-on="cListeners"
          @close="_close"
        />
      
      </div>
      <div class="overlay" @click="_close"></div>
    </div>
  </transition>
</template>

<script>
import ReviewModal from "./ReviewModal";

export default {
  data() {
    return {
      modals: {
        review: ReviewModal,
      
      },
      show: false,
      activeName: "",
      cProps: {},
      cListeners: {},
    };
  },
  components: {
    ReviewModal,
    
    // svgClose,
  },
  created() {
    this.$modal.on("open", ({ name, props, on }) => {
      this.activeName = name;
      this.cProps = props;
      this.cListeners = on;
      this.open();
    });
    this.$modal.on("close", (name) => {
      this.activeName = "";
      this.cProps = {};
      this.cListeners = {};

      this.close();
    });
  },
  mounted() {},
  computed: {
    modalClass() {
      return `modal-${this.activeName}`
    },
    activeModal() {
      return this.modals[this.activeName];
    },
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    _close() {
      this.show = false;
      this.$modal._close();
    },
  },
};
</script>

<style lang="scss">

.modal-fade-enter,
.modal-fade-leave-to {
  .modal-inner {
    opacity: 0;
  }
  .overlay {
    opacity: 0;
  }
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: 0.5s;
}
</style>