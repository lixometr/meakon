<template>
  <div id="index">
    <!-- header -->
    <!-- header -->
    <header class="offer">
      <div class="wrapper">
        <video class="mainscreen-video" autoplay="" muted="" loop="">
          <source src="/assets/video/vid.mp4" type="video/mp4" />
        </video>
      </div>

      <div class="container-fluid">
        <div class="row">
          <div class="col-1 d-sm-none d-md-block"></div>

          <div class="col-lg-11 col-md-12 col-sm-12 offer_info">
            <h1>
              {{ getValue("blok_pervogo_ekrana.zagolovok_ofera") }}
              <!-- Производим и реализуем <br />медицинские расходные материалы -->
            </h1>
            <p>{{ getValue("blok_pervogo_ekrana.podzagolovok_ofera") }}</p>
            <a
              class="podrobnee_btn"
              :href="getValue('blok_pervogo_ekrana.ssilka_knopki_ofera')"
            >
              <div class="btn_wrapper">
                <button class="learn-more">
                  <span class="circle" aria-hidden="true">
                    <span class="icon arrow"></span>
                  </span>
                  <span class="button-text">{{
                    getValue("blok_pervogo_ekrana.nazvanie_knopki_ofera")
                  }}</span>
                </button>
              </div>
            </a>
          </div>
        </div>
        <div class="rounded"><img src="assets/img/rounded.png" /></div>
      </div>
    </header>
    <!-- //header -->

    <!-- section расходники -->
    <section class="med_rashodniki">
      <div class="container-fluid">
        <div class="row">
          <!-- Навигация -->
          <div class="col-1">
            <i class="nav-fill">&nbsp;</i>
            <div class="left_nav">
              <img src="/assets/img/section.png" />
              <span>Каталог</span>
            </div>
          </div>
          <!-- //Навигация -->

          <!-- Описание блока -->
          <div class="col-lg-3 col-md-11 col-sm-11">
            <h2>
              {{
                getValue("blok_vivoda_tovarov.zagolovok_bloka_vivoda_tovarov")
              }}
            </h2>
            <p class="desc">
              {{
                getValue(
                  "blok_vivoda_tovarov.podzagolovok_bloka_vivoda_tovarov"
                )
              }}
            </p>

            <a
              class="podrobnee_btn"
              :href="
                getValue(
                  'blok_vivoda_tovarov.ssilka_na_knopke_v_bloke_vivoda_tovara'
                )
              "
            >
              <div class="btn_wrapper">
                <button class="learn-more">
                  <span class="circle" aria-hidden="true">
                    <span class="icon arrow"></span>
                  </span>
                  <span class="button-text">{{
                    getValue(
                      "blok_vivoda_tovarov.nazvanie_knopki_v_bloke_vivoda_tovarov"
                    )
                  }}</span>
                </button>
              </div>
            </a>
          </div>
          <!-- //Описание блока -->

          <div class="col-sm-12 col-md-8 col-lg-8">
            <!-- Swiper -->
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <!-- card -->

                <div class="swiper-slide card card-shadow">
                  <img src="assets/img/slider/im2.png" />
                  <p>Скальпели</p>
                  <a class="podrobnee_btn" href="#">
                    <div class="btn_wrapper">
                      <button class="learn-more">
                        <span class="circle" aria-hidden="true">
                          <span class="icon arrow"></span>
                        </span>
                        <span class="button-text">Подробнее</span>
                      </button>
                    </div>
                  </a>
                </div>

                <!-- //card -->
                <!-- card -->

                <div class="swiper-slide card card-shadow">
                  <img src="assets/img/slider/im1.jpg" />
                  <p>Скальпели</p>

                  <a class="podrobnee_btn" href="#">
                    <div class="btn_wrapper">
                      <button class="learn-more">
                        <span class="circle" aria-hidden="true">
                          <span class="icon arrow"></span>
                        </span>
                        <span class="button-text">Подробнее</span>
                      </button>
                    </div>
                  </a>
                </div>

                <!-- //card -->
                <!-- card -->

                <div class="swiper-slide card card-shadow">
                  <img src="assets/img/slider/im1.jpg" />
                  <p>Скальпели</p>

                  <a class="podrobnee_btn" href="#">
                    <div class="btn_wrapper">
                      <button class="learn-more">
                        <span class="circle" aria-hidden="true">
                          <span class="icon arrow"></span>
                        </span>
                        <span class="button-text">Подробнее</span>
                      </button>
                    </div>
                  </a>
                </div>

                <!-- //card -->
                <!-- card -->

                <div class="swiper-slide card card-shadow">
                  <img src="assets/img/slider/im1.jpg" />
                  <p>Скальпели</p>

                  <a class="podrobnee_btn" href="#">
                    <div class="btn_wrapper">
                      <button class="learn-more">
                        <span class="circle" aria-hidden="true">
                          <span class="icon arrow"></span>
                        </span>
                        <span class="button-text">Подробнее</span>
                      </button>
                    </div>
                  </a>
                </div>

                <!-- //card -->
                <!-- card -->

                <div class="swiper-slide card card-shadow">
                  <img src="assets/img/slider/im1.jpg" />
                  <p>Скальпели</p>

                  <a class="podrobnee_btn" href="#">
                    <div class="btn_wrapper">
                      <button class="learn-more">
                        <span class="circle" aria-hidden="true">
                          <span class="icon arrow"></span>
                        </span>
                        <span class="button-text">Подробнее</span>
                      </button>
                    </div>
                  </a>
                </div>

                <!-- //card -->
              </div>
              <!-- Add Arrows -->
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
            <!-- //swiper -->
          </div>
        </div>
      </div>
    </section>
    <!--// section расходники-->

    <!-- section поч мы -->
    <section class="med_why">
      <div class="container-fluid">
        <div class="row">
          <!-- Навигация -->
          <div class="col-1">
            <i class="nav-fill">&nbsp;</i>
            <div class="left_nav">
              <img src="/assets/img/section.png" />
              <span>Плюсы</span>
            </div>
          </div>
          <!-- //Навигация -->

          <!-- Описание блока -->
          <div class="col-sm-11 col-md-3 col-lg-3">
            <h2>{{ getValue("blok_plyusov.zagolovok_bloka_plyusov") }}</h2>
            <p class="desc">
              {{ getValue("blok_plyusov.podzagolovok_bloka_plyusov") }}
            </p>
          </div>
          <!-- //Описание блока -->

          <!-- Описание блока -->

          <div class="col-sm-12 col-md-8 col-lg-8">
            <ul>
              <li
                v-for="(item, idx) in getValue('blok_plyusov.plyusi_kompanii')"
                :key="idx"
              >
                <span>{{ item.zagolovok_plyusa }}</span>
              </li>
              <!-- <li>
                <span>Удобное <br />расположение склада</span>
              </li>
              <li>
                <span
                  >Гибкий сервис<br />
                  для клиента</span
                >
              </li>
              <li>
                <span>Удобное <br />расположение склада</span>
              </li>
              <li>
                <span
                  >Гибкий сервис<br />
                  для клиента</span
                >
              </li>
              <li>
                <span>Удобное <br />расположение склада</span>
              </li> -->
            </ul>
          </div>
          <!-- //Описание блока -->
        </div>
      </div>
    </section>
    <!--// section поч мы-->

    <!-- Фото коллектива -->
    <section class="med_photo">
      <div class="container-fluid">
        <div class="row">
          <div class="d-sm-none d-md-block d-lg-block col-lg-1 col-md-1"></div>
          <div class="col-lg-11 col-md-12 col-sm-12 col-xs-12">
            <!--  <img src="assets/img/img_main.png" alt=""> -->
            <div class="wrapper2">
              <video class="mainscreen-video2" autoplay="" muted="" loop="">
                <source src="/assets/video/vid.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--// Фото коллектива-->

    <!-- section о компании -->
    <section class="med_about">
      <div class="container-fluid">
        <div class="row">
          <!-- Навигация -->
          <div class="col-1">
            <i class="nav-fill">&nbsp;</i>
            <div class="left_nav">
              <img src="assets/img/section.png" />
              <span>Meakon</span>
            </div>
          </div>
          <!-- //Навигация -->

          <!-- Описание блока -->
          <div class="col-lg-3 col-sm-12">
            <h2>
              {{ getValue("blok_anonsa_kompanii.zagolovok_anonsa_kompanii") }}
            </h2>
            <p class="d-none">
              H7 Headline Сайт рыбатекст поможет дизайнеру, верстальщику,
              вебмастеру сгенерировать несколько абзацев более менее
            </p>
          </div>
          <!-- //Описание блока -->

          <!-- текст о компании -->
          <div class="col-lg-8 col-md-12 col-sm-12">
            <div class="about_text">
              <!-- text1 -->
              <AText
                :text="getValue('blok_anonsa_kompanii.tekst_anonsa_kompanii')"
              />
              <!-- //text1 -->

              <!-- text2 -->
              <div>
                <p>
                  H7 Headline Сайт рыбатекст поможет дизайнеру,<br />
                  верстальщику, вебмастеру сгенерировать несколько абзацев более
                  менее осмысленного текста рыбы на русском языке, а начинающему
                  оратору отточить навык публичных выступлений в домашних
                  условиях.
                </p>
              </div>
              <!-- //text2 -->

              <a
                class="podrobnee_btn"
                :href="getValue('blok_anonsa_kompanii.ssilka_knopki_anonsa')"
              >
                <div class="btn_wrapper">
                  <button class="learn-more">
                    <span class="circle" aria-hidden="true">
                      <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">{{
                      getValue("blok_anonsa_kompanii.tekst_knopki_anonsa")
                    }}</span>
                  </button>
                </div>
              </a>
            </div>
          </div>
          <!-- //текст о компании -->
        </div>
      </div>
    </section>
    <!--// section о компании-->
  </div>
</template>

<script>
import PageTemplateMixin from "@/mixins/PageTemplateMixin";
export default {
  mixins: [PageTemplateMixin],
  mounted() {
    var swiper = new Swiper(".swiper-container", {
      slidesPerView: 4,
      loop: true,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      spaceBetween: 5,
      // init: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 45,
        },
      },
    });
  },
};
</script>

<style lang="scss" >
</style>