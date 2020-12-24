<template>
  <div>
    <div class="modal js-modal" data-modal="modal">
      <span class="close_button js-modal-close"></span>

      <div class="form_review__callback">
        <div class="form_review__title">
          <h3>Заголовок точки захвата в две строки</h3>
          <p>Заполните форму ниже, мы перезвоним в ближайшее время</p>
        </div>
        <div class="form_review__body">
          <input type="text" placeholder="Введите имя" />
          <input type="text" placeholder="+7 (___)___-__-__" />
          <input type="text" placeholder="E-mail" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Ваш вопрос"
          ></textarea>
        </div>
        <div class="form_review__footer">
          <a class="podrobnee_btn" href="#">
            <div class="btn_wrapper">
              <button class="learn-more">
                <span class="circle" aria-hidden="true">
                  <span class="icon arrow"></span>
                </span>
                <span class="button-text">Отправить</span>
              </button>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="overlay js-modal-overlay"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" >
</style>