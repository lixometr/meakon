<template>
  <section class="product_tabs">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-1 d-none d-md-block"></div>
        <div class="col-lg-11 col-sm-12">
          <div class="tabs">
            <input
              type="radio"
              name="tab-btn"
              id="tab-btn-1"
              value=""
              checked
            />
            <label for="tab-btn-1">{{ $t("description") }}</label>
            <input type="radio" name="tab-btn" id="tab-btn-2" value="" />
            <label for="tab-btn-2">{{ $t("characteristics") }}</label>
            <input type="radio" name="tab-btn" id="tab-btn-3" value="" />
            <!-- <label for="tab-btn-3" style="display: none">Отзывы о товаре</label> -->

            <div id="content-1">
              <p>
                Перчатки смотровые синтетические нестерильные неопудренные
                текстурированные только на пальцах НИТРИЛОВЫЕ кобальт блю цвета;
                материал - нитрил; назначение - смотровые диагностические;
                коэффициент AQL (приемлемый уровень качества) - не более 1,5
                (указано на упаковке) ; неанатомические (без разделения на
                правую и левую руки); текстурированные только на пальцах;
                перчатки смотровые синтетические нестерильные неопудренные
                текстурированные только на пальцах НИТРИЛОВЫЕ кобальт блю цвета;
                материал - нитрил; назначение - смотровые диагностические;
                коэффициент AQL (приемлемый уровень качества) - не более 1,5
                (указано на упаковке) ; неанатомические (без разделения на
                правую и левую руки); текстурированные только на пальцах;
              </p>
            </div>
            <div id="content-2">
              <ProductCharacteristics :product="product"/>
            </div>
            <!-- <div id="content-3" style="display: none">
              <div class="form_review">
                <div class="form_review__title"><h3>Отставить отзыв</h3></div>
                <div class="form_review__body">
                  <input type="text" placeholder="Имя" />
                  <input type="text" placeholder="E-mail" />
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Ваш отзыв"
                  ></textarea>
                </div>
                <div class="form_review__footer">
                  <button>отправить</button>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" >
</style>