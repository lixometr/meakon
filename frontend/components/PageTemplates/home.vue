<template>
  <div id="index">
    <!-- header -->
    <!-- header -->
    <header class="offer">
      <div class="wrapper">
        <video class="mainscreen-video" playsinline autoplay="" muted="" loop="">
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
          <div class="col-1 d-none d-md-block">
            <i class="nav-fill">&nbsp;</i>
            <div class="left_nav">
              <img src="/assets/img/section.png" />
              <span>{{ getLangValue("dop_elementi.produktsiya") }}</span>
            </div>
          </div>
          <!-- //Навигация -->

          <!-- Описание блока -->
          <div class="col-lg-3 col-md-12 col-sm-11">
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

            <AppButton
              :link="
                getValue(
                  'blok_vivoda_tovarov.ssilka_na_knopke_v_bloke_vivoda_tovara'
                )
              "
              :text="
                getLangValue(
                  'blok_vivoda_tovarov.nazvanie_knopki_v_bloke_vivoda_tovarov'
                )
              "
            />
          </div>
          <!-- //Описание блока -->

          <div class="col-sm-12 col-md-12 col-lg-8">
            <!-- Swiper -->
            <client-only>
              <swiper :options="sliderOptions">
                <swiper-slide
                  class="card card-shadow"
                  v-for="(item, idx) in getValue(
                    'blok_vivoda_tovarov.vivod_tovarov_na_glavnoi'
                  )"
                  :key="idx"
                >
                  <AppImage :img="item.image" />
                  <p>{{ $langValue(item, "name") }}</p>
                  <AppButton
                    :link="$url.category(item.full_slug)"
                    :text="$t('more')"
                /></swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>
            </client-only>
            <!-- <div class="swiper-container">
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
                  {{ item.name }}

                  <AppButton
                    :link="$url.category(item.full_slug)"
                    :text="$t('more')"
                  />
                </div>
              </div>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div> -->
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
          <div class="col-1 d-none d-md-block">
            <i class="nav-fill">&nbsp;</i>
            <div class="left_nav">
              <img src="/assets/img/section.png" />
              <span>{{ getLangValue("dop_elementi.plyusi") }}</span>
            </div>
          </div>
          <!-- //Навигация -->

          <!-- Описание блока -->
          <div class="col-sm-11 col-md-12 col-lg-3">
            <h2>{{ getLangValue("blok_plyusov.zagolovok_bloka_plyusov") }}</h2>
            <p class="desc">
              {{ getLangValue("blok_plyusov.podzagolovok_bloka_plyusov") }}
            </p>
          </div>
          <!-- //Описание блока -->

          <!-- Описание блока -->

          <div class="col-sm-12 col-md-12 col-lg-8">
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
              <video class="mainscreen-video2"  playsinline autoplay="" muted="" loop="">
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
          <div class="col-1 d-none d-md-block">
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

              <AppButton
                :link="getValue('blok_anonsa_kompanii.ssilka_knopki_anonsa')"
                :text="getLangValue('blok_anonsa_kompanii.tekst_knopki_anonsa')"
              />
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
    // var swiper = new Swiper(".swiper-container", {
    //   slidesPerView: 4,
    //   loop: true,
    //   autoplay: {
    //     delay: 5000,
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
    //       spaceBetween: 20,
    //     },
    //     768: {
    //       slidesPerView: 3,
    //       spaceBetween: 20,
    //     },
    //     1024: {
    //       slidesPerView: 4,
    //       spaceBetween: 45,
    //     },
    //   },
    // });
    await this.$loadScript("/assets/js/circletype.min.js");
    const circleType = new CircleType(document.getElementById("curved1"));
  },
  computed: {
    sliderOptions() {
      return {
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

        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 29,
		  },
		  1500: {
            slidesPerView: 4,
            spaceBetween: 29,
          },
        },
      };
    },
  },
};
</script>

<style lang="scss" >
#curved1 {
  word-spacing: 10px;
}
</style>