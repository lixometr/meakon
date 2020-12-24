<template>
  <div>
    <div class="modal js-modal" data-modal="modal">
      <span class="close_button js-modal-close" @click="$emit('close')"></span>

      <div class="form_review__callback" v-if="!isSubmit">
        <div class="form_review__title">
          <h3>{{ $t(`modal.${type}.title`) }}</h3>
          <p>{{ $t(`modal.${type}.subTitle`) }}</p>
        </div>
        <div class="form_review__body">
          <input type="text" :placeholder="$t('form.name')" v-model="name" />
          <input type="phone" :placeholder="$t('form.phone')" v-model="phone" />
          <input type="text" :placeholder="$t('form.email')" v-model="email" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            :placeholder="$t('form.message')"
            v-model="message"
            v-if="showMessage"
          ></textarea>
          <p class="form_review_text" v-html="$t('form.policy')"></p>
        </div>
        <div class="form_review__footer">
          <a class="podrobnee_btn" href="#" @click.prevent="submit">
            <div class="btn_wrapper">
              <button class="learn-more">
                <span class="circle" aria-hidden="true">
                  <span class="icon arrow"></span>
                </span>
                <span class="button-text">{{
                  $t(`modal.${type}.btnText`)
                }}</span>
              </button>
            </div>
          </a>
        </div>
      </div>
      <div class="form_review__callback" v-if="isSubmit">
        <div class="form_review__title thanks">
          <h3>Отзыв отправлен. Спасибо!</h3>
        </div>
      </div>
    </div>
    <div class="overlay js-modal-overlay"></div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
  },
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      message: "",
      isSubmit: false,
    };
  },
  computed: {
    showMessage() {
      if(this.type === 'contact') return true
      return false
    },
    showReview() {
      // if(this.type === 'product') return true
      return false

    }
  },
  methods: {
    submit() {
      this.sendForm();
    },
    async sendForm() {
      try {
        const result = await this.$api.$post("formContact", null, {
          name: this.name,
          phone: this.phone,
          email: this.email,
          message: this.message,
          type: this.type,
        });
        if (result.ok) {
          this.isSubmit = true;
        }
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>