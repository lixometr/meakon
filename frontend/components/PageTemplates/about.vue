<template>
  <div id="aboutPage">
    <!-- header -->
    <header class="offer">
      <!-- fix меню -->
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <PageBreadcrumbs
              :items="[{ name: $langValue(value, 'name'), link: '' }]"
            />
            <AppImage
              class="about_offer_img"
              :img="getValue('blok_o_kompanii.izobrazhenie_pervogo_ekrana')"
            />
          </div>
        </div>
      </div>
      <!-- //fix меню -->
    </header>

    <!-- section о компании -->
    <section class="med_about">
      <div class="container-fluid">
        <div class="row">
          <!-- Навигация -->
          <div class="col-lg-1 col-md-1">
            <div class="left_nav">
              <img src="/assets/img/section.png" />
              <span>{{ getLangValue("dopolnitelnie_elementi.meakon") }}</span>
            </div>
          </div>
          <!-- //Навигация -->

          <!-- Описание блока -->
          <div class="col-lg-3 col-md-5 col-sm-12">
            <h2>
              {{ getLangValue("blok_o_kompanii.zagolovok_bloka_o_kompanii") }}
            </h2>
          </div>
          <!-- //Описание блока -->

          <!-- текст о компании -->
          <div class="col-lg-8 col-md-6 col-sm-12">
            <div class="about_text">
              <!-- text1 -->
              <div>
                <AText
                  :text="getLangValue('blok_o_kompanii.tekst_o_kompanii')"
                />
              </div>
              <!-- //text1 -->

              <!-- text2 -->
              <div>
                <AText
                  :text="getLangValue('blok_o_kompanii.tekst_o_kompanii_2')"
                />
              </div>
              <!-- //text2 -->
            </div>
          </div>
          <!-- //текст о компании -->
        </div>
        <div class="row">
          <!-- Навигация -->
          <div class="col-lg-1 col-md-1 col-sm-12">
            <div class="left_nav"></div>
          </div>
          <!-- //Навигация -->

          <!-- Описание блока -->
          <div class="col-lg-3 col-md-5 col-sm-12"></div>
          <!-- //Описание блока -->

          <!-- текст о компании -->
          <div class="col-lg-8 col-md-6 col-sm-12">
            <div class="about_text_col3">
              <!-- text1 -->
              <div
                v-for="(item, idx) in getValue(
                  'blok_o_kompanii.blok_mi_v_tsifrakh'
                )"
                :key="idx"
              >
                <ul>
                  <li class="cifra">
                    {{
                      getValue(
                        `blok_o_kompanii.blok_mi_v_tsifrakh[${idx}].tsifra_kompanii`
                      )
                    }}
                  </li>
                  <li class="line">
                    <img src="/assets/img/change_lang.png" alt="" />
                  </li>
                  <li class="cifra_desc">
                    {{
                      getLangValue(
                        `blok_o_kompanii.blok_mi_v_tsifrakh[${idx}].opisanie_tsifri_kompanii`
                      )
                    }}
                  </li>
                </ul>
              </div>
              <!-- //text1 -->

              <!-- text2 -->

              <!-- //text3 -->
            </div>
          </div>
          <!-- //текст о компании -->
        </div>
      </div>
    </section>
    <!--// section о компании-->

    <!-- section работаем честно -->
    <section class="med_work">
      <div class="container-fluid">
        <div class="row">
          <!-- Навигация -->
          <div class="col-lg-1 col-md-1 col-sm-1">
            <div class="left_nav">
              <img src="/assets/img/section_black.png" />
              <span>{{
                getLangValue("dopolnitelnie_elementi.printsipi")
              }}</span>
            </div>
          </div>
          <!-- //Навигация -->

          <!-- Описание блока -->
          <div class="col-lg-3 col-md-5 col-sm-12">
            <h2>
              {{
                getLangValue("dopolnitelnii_blok_o_kompanii.zagolovok_dopbloka")
              }}
            </h2>
            <p class="desc"></p>
          </div>
          <!-- //Описание блока -->

          <!-- Описание блока -->
          <div class="col-lg-8 col-md-6 col-sm-12">
            <div class="about_text_col4">
              <!-- text1 -->
              <div>
                <AText
                  :text="
                    getLangValue(
                      'dopolnitelnii_blok_o_kompanii.tekst_dop_bloka'
                    )
                  "
                />
              </div>
              <!-- //text1 -->

              <!-- text2 -->
              <div>
                <AText
                  :text="
                    getLangValue(
                      'dopolnitelnii_blok_o_kompanii.tekst_dop_bloka_2'
                    )
                  "
                />
              </div>
              <!-- //text2 -->
            </div>
          </div>
          <!-- //Описание блока -->
        </div>
        <div class="row commrads">
          <!-- Навигация -->
          <div class="col-lg-1 col-md-1 d-sm-none d-md-none d-lg-block">
            <div class="left_nav">
              <img src="/assets/img/section_black.png" />
              <span>{{ getLangValue("dopolnitelnie_elementi.komanda") }}</span>
            </div>
          </div>
          <!-- //Навигация -->

          <!-- Описание блока -->
          <div class="col-lg-10 col-md-12 col-sm-12 docs">
            <!-- Swiper -->
            <swiper class="swiper_docs" :options="slider1Options">
              <swiper-slide
                class="doc"
                v-for="(person, idx) in getValue(
                  'dopolnitelnii_blok_o_kompanii.sotrudniki_kompanii'
                )"
                :key="idx"
              >
                <div class="box" v-if="(idx & 1) === 1"></div>
                <div class="doc_image">
                  <AppImage
                    :img="
                      getValue(
                        `dopolnitelnii_blok_o_kompanii.sotrudniki_kompanii[${idx}].foto_sotrudnika`
                      )
                    "
                  />
                </div>
                <div class="description_title">
                  <p>
                    {{
                      getLangValue(
                        `dopolnitelnii_blok_o_kompanii.sotrudniki_kompanii[${idx}].fio`
                      )
                    }}
                  </p>
                  <a href="">{{
                    getLangValue(
                      `dopolnitelnii_blok_o_kompanii.sotrudniki_kompanii[${idx}].dolzhnost`
                    )
                  }}</a>
                  <div class="doc_info">
                    <hr />
                    <span>{{
                      getLangValue(
                        `dopolnitelnii_blok_o_kompanii.sotrudniki_kompanii[${idx}].tekst_ot_sotrudnika`
                      )
                    }}</span>
                  </div>
                </div>
              </swiper-slide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
          <!-- //Описание блока -->
        </div>
      </div>
    </section>
    <!--// section работаем честно-->

    <!-- section расходники -->
    <section class="med_banks">
      <div class="container-fluid">
        <div class="row">
          <!-- Навигация -->
          <div class="col-lg-1 col-md-1 col-sm-1">
            <div class="left_nav">
              <img src="/assets/img/section.png" />
              <span>{{ getLangValue("dopolnitelnie_elementi.partneri") }}</span>
            </div>
          </div>
          <!-- //Навигация -->

          <!-- Описание блока -->
          <div class="col-lg-3 col-md-6 col-sm-12">
            <h2>
              {{ getLangValue("klientim.zagolovok_bloka_klienti") }}
            </h2>
          </div>
          <!-- //Описание блока -->

          <div class="col-lg-8 col-md-5 col-sm-12">
            <!-- Swiper -->
            <swiper class="swiper-banks" :options="slider2Options">
              <swiper-slide
                class="banks"
                v-for="(image, idx) in getValue('klientim.logo_klientov')"
                :key="idx"
              >
                <div class="swiper-slide banks">
                  <AppImage :img="getValue(`klientim.logo_klientov[${idx}]`)" />
                  <a href="#">&nbsp;</a>
                </div>
              </swiper-slide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
            <!-- <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide banks">
                  <img src="/assets/img/slider_3/apt.png" />
                  <a href="#">&nbsp;</a>
                </div>
              </div>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div> -->

            <!-- Initialize Swiper -->
          </div>
        </div>
      </div>
    </section>
    <!--// section расходники-->

    <section class="preFooter">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-8 col-md-12 col-sm-12">
            <h3>
              {{
                getLangValue(
                  "tochka_zakhvata_na_str_kompanii.zagolovok_bloka_tz"
                )
              }}
            </h3>
          </div>
          <div class="col-lg-4 col-md-12 col-sm-12">
            <nuxt-link
              class="podrobnee_btn"
              :to="
                getValue('tochka_zakhvata_na_str_kompanii.ssilka_knopki_tz') ||
                '#'
              "
            >
              <div class="btn_wrapper">
                <button class="learn-more">
                  <span class="circle" aria-hidden="true">
                    <span class="icon arrow"></span>
                  </span>
                  <span class="button-text">{{
                    getLangValue(
                      "tochka_zakhvata_na_str_kompanii.nazvanie_knopki_tz"
                    )
                  }}</span>
                </button>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="leaves"></div>
    </section>
  </div>
</template>

<script>
import PageTemplateMixin from "@/mixins/PageTemplateMixin";

export default {
  mixins: [PageTemplateMixin],
  computed: {
    slider1Options() {
      return {
        loop: true,
        autoplay: {
          delay: 6000,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        spaceBetween: 5,
        // init: false,
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true,
        // },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        },
      };
    },
    slider2Options() {
      return {
        loop: true,
        autoplay: {
          delay: 8000,
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
            spaceBetween: 40,
          },
          668: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        },
      };
    },
  },
  mounted() {
    // new Swiper(".swiper_docs", {
    //   loop: true,
    //   autoplay: {
    //     delay: 6000,
    //   },
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    //   spaceBetween: 5,
    //   // init: false,
    //   pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    //   },
    //   breakpoints: {
    //     320: {
    //       slidesPerView: 1,
    //       spaceBetween: 10,
    //     },
    //     768: {
    //       slidesPerView: 2,
    //       spaceBetween: 40,
    //     },
    //     1024: {
    //       slidesPerView: 4,
    //       spaceBetween: 50,
    //     },
    //   },
    // });
    // new Swiper(".swiper-banks", {
    //   loop: true,
    //   autoplay: {
    //     delay: 8000,
    //   },
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    //   spaceBetween: 5,
    //   // init: false,
    //   pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    //   },
    //   breakpoints: {
    //     320: {
    //       slidesPerView: 1,
    //       spaceBetween: 40,
    //     },
    //     668: {
    //       slidesPerView: 2,
    //       spaceBetween: 40,
    //     },
    //     1024: {
    //       slidesPerView: 5,
    //       spaceBetween: 30,
    //     },
    //   },
    // });
  },
};
</script>

<style lang="scss" >
</style>