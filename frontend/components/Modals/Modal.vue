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
        <div class="modal-close" @click="_close">
          <svgClose width="20" />
        </div>
      </div>
      <div class="overlay" @click="_close"></div>
    </div>
  </transition>
</template>

<script>
import AddToCartModal from "./AddToCartModal";
import AuthModal from "./AuthModal";
import ChatModal from "./ChatModal";
import svgClose from "@/static/img/ico/close.svg";
import RestorePasswordModal from "./RestorePasswordModal";
import ResetPasswordModal from "./ResetPasswordModal";
import RewardModal from "./RewardModal";
import ChooseRewardModal from "./ChooseRewardModal";
import RegionModal from "./RegionModal";
export default {
  data() {
    return {
      modals: {
        added: AddToCartModal,
        auth: AuthModal,
        chat: ChatModal,
        restorePassword: RestorePasswordModal,
        resetPassword: ResetPasswordModal,
        reward: RewardModal,
        chooseReward: ChooseRewardModal,
        region: RegionModal,
      },
      show: false,
      activeName: "",
      cProps: {},
      cListeners: {},
    };
  },
  components: {
    AddToCartModal,
    AuthModal,
    ChatModal,
    RestorePasswordModal,
    ResetPasswordModal,
    svgClose,
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
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
  .modal-inner {
    z-index: 10;
    transition: 0.2s;
    position: relative;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgb(45, 59, 92);
    opacity: 0.9;
    transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
    z-index: 1;
    transition: 0.5s;
  }
  .modal-close {
    color: rgb(45, 59, 92);
    position: absolute;
    top: 30px;
    right: 30px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid currentColor;
    svg {
      fill: currentColor;
    }
  }
}
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