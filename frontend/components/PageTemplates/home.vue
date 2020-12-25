<template>
  <div id="index">
    <!-- header -->
    <!-- header -->
    <header class="offer">
      <div class="wrapper">
        <video class="mainscreen-video" autoplay="" muted="" loop="">
          <source
            :src="getValue('blok_pervogo_ekrana.fonovoe_video_ofera')"
            type="video/mp4"
          />
        </video>
      </div>

      <div class="container-fluid">
        <div class="row">
          <div class="col-1 d-sm-none d-md-block"></div>

          <div class="col-lg-11 col-md-12 col-sm-12 offer_info">
            <h1>
              {{ getLangValue("blok_pervogo_ekrana.zagolovok_ofera") }}
            </h1>
            <p>{{ getLangValue("blok_pervogo_ekrana.podzagolovok_ofera") }}</p>

            <div class="Button_page">
              <nuxt-link
                class="more-button-wrap"
                :to="getValue('blok_pervogo_ekrana.ssilka_knopki_ofera') || '#'"
                data-main-index=""
              >
                <span class="more-button-background">
                  <span class="more-button-ico"></span>
                </span>
                <span class="more-button-title"
                  >{{
                    getLangValue("blok_pervogo_ekrana.nazvanie_knopki_ofera")
                  }}
                </span>
              </nuxt-link>
            </div>
          </div>
        </div>

        <div class="rounded">
          <img src="/assets/img/section.png" alt="" />
          <div id="curved1">
            {{ getLangValue("dop_elementi.listaite_vniz") }}
          </div>
        </div>
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
              <span>{{ getLangValue("dop_elementi.produktsiya") }}</span>
            </div>
          </div>
          <!-- //Навигация -->

          <!-- Описание блока -->
          <div class="col-lg-3 col-md-11 col-sm-11">
            <h2>
              {{
                getLangValue(
                  "blok_vivoda_tovarov.zagolovok_bloka_vivoda_tovarov",
                  "blok_vivoda_tovarov.en_zagolovok_bloka_vivoda_kategorii_tovarov"
                )
              }}
            </h2>
            <p class="desc">
              {{
                getLangValue(
                  "blok_vivoda_tovarov.podzagolovok_bloka_vivoda_tovarov"
                )
              }}
            </p>

            <nuxt-link
              class="podrobnee_btn"
              :to="
                getValue(
                  'blok_vivoda_tovarov.ssilka_na_knopke_v_bloke_vivoda_tovara'
                ) || '#'
              "
            >
              <div class="btn_wrapper">
                <button class="learn-more">
                  <span class="circle" aria-hidden="true">
                    <span class="icon arrow"></span>
                  </span>
                  <span class="button-text">{{
                    getLangValue(
                      "blok_vivoda_tovarov.nazvanie_knopki_v_bloke_vivoda_tovarov"
                    )
                  }}</span>
                </button>
              </div>
            </nuxt-link>
          </div>
          <!-- //Описание блока -->

          <div class="col-sm-12 col-md-8 col-lg-8">
            <!-- Swiper -->

            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide card card-shadow"
                  v-for="(item, idx) in getValue(
                    'blok_vivoda_tovarov.vivod_tovarov_na_glavnoi'
                  )"
                  :key="idx"
                >
                  <AppImage :img="item.image" />
                  <p>{{ $langValue(item, "name") }}</p>
                  {{item.name}}
                  <nuxt-link
                    class="podrobnee_btn"
                    :to="$url.category(item.full_slug) || '#'"
                  >
                    <div class="btn_wrapper">
                      <button class="learn-more">
                        <span class="circle" aria-hidden="true">
                          <span class="icon arrow"></span>
                        </span>
                        <span class="button-text">{{ $t("more") }}</span>
                      </button>
                    </div>
                  </nuxt-link>
                </div>
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
              <span>{{ getLangValue("dop_elementi.plyusi") }}</span>
            </div>
          </div>
          <!-- //Навигация -->

          <!-- Описание блока -->
          <div class="col-sm-11 col-md-3 col-lg-3">
            <h2>{{ getLangValue("blok_plyusov.zagolovok_bloka_plyusov") }}</h2>
            <p class="desc">
              {{ getLangValue("blok_plyusov.podzagolovok_bloka_plyusov") }}
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
                <span>{{
                  getLangValue(
                    `blok_plyusov.plyusi_kompanii[${idx}].zagolovok_plyusa`
                  )
                }}</span>
              </li>
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
                <source
                  :src="getValue('blok_anonsa_kompanii.video_prezentatsiya')"
                  type="video/mp4"
                />
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
              <img src="/assets/img/section.png" />
              <span>{{ getLangValue("dop_elementi.meakon") }}</span>
            </div>
          </div>
          <!-- //Навигация -->

          <!-- Описание блока -->
          <div class="col-lg-3 col-sm-12">
            <h2>
              {{
                getLangValue("blok_anonsa_kompanii.zagolovok_anonsa_kompanii")
              }}
            </h2>
          </div>
          <!-- //Описание блока -->

          <!-- текст о компании -->
          <div class="col-lg-8 col-md-12 col-sm-12">
            <div class="about_text">
              <!-- text1 -->
              <AText
                :text="
                  getLangValue('blok_anonsa_kompanii.tekst_anonsa_kompanii')
                "
              />
              <!-- //text1 -->

              <!-- text2 -->
              <div>
                <AText
                  :text="
                    getLangValue(
                      'blok_anonsa_kompanii.tekst_anonsa_kompanii_2',
                      'blok_anonsa_kompanii.en_ukazhite_kratkii_tekst_o_kompanii_2'
                    )
                  "
                />
              </div>
              <!-- //text2 -->

              <nuxt-link
                class="podrobnee_btn"
                :to="
                  getValue('blok_anonsa_kompanii.ssilka_knopki_anonsa') || '#'
                "
              >
                <div class="btn_wrapper">
                  <button class="learn-more">
                    <span class="circle" aria-hidden="true">
                      <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">{{
                      getLangValue("blok_anonsa_kompanii.tekst_knopki_anonsa")
                    }}</span>
                  </button>
                </div>
              </nuxt-link>
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
  async mounted() {
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
    await this.$loadScript("/assets/js/circletype.min.js");
    const circleType = new CircleType(document.getElementById("curved1"));
  },
  computed: {},
};
</script>

<style lang="scss" >
#curved1 {
  word-spacing: 10px;
}
</style>