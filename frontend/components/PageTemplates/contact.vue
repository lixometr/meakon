<template>
  <div id="contacts">
    <PageBreadcrumbs :items="[{ name: $langValue(value, 'name'), link: '' }]" />

    <!-- section о компании -->

    <section class="med_contacts">
      <div class="container-fluid">
        <div class="row">
          <!-- Навигация -->
          <div class="col-lg-1 col-md-1 col-sm-12">
            <div class="left_nav">
              <img src="/assets/img/section.png" />
              <span>{{ getLangValue("dop_polya.tekst_kontakti") }}</span>
            </div>
          </div>
          <!-- //Навигация -->

          <!-- Описание блока -->
          <div class="col-lg-3 col-md-3 col-sm-12">
            <h2>
              {{ getLangValue("zagolovok_stranitsi_kontaktov") }}
            </h2>
            <!-- <p class="d-none">
              H7 Headline Сайт рыбатекст поможет дизайнеру, верстальщику,
              вебмастеру сгенерировать несколько абзацев более менее
            </p> -->
          </div>
          <!-- //Описание блока -->

          <!-- текст о компании -->
          <div class="col-lg-5 col-md-5 col-sm-12">
            <div class="contact_info">
              <ul>
                <li>
                  <span>{{ $t("contact.address") }}: </span
                  ><b>{{ getLangValue("adres") }}</b>
                </li>
                <li>
                  <span>{{ $t("contact.phone") }}: </span
                  ><b>
                    <span v-for="(item, idx) in getValue('telefoni')" :key="idx"
                      >{{ item.telefon }}
                    </span>
                  </b>
                </li>
                <li>
                  <span>E-mail: </span><b>{{ getValue("email") }}</b>
                </li>
                <li>
                  <span>{{ $t("contact.workTime") }}: </span
                  ><b>{{ getLangValue("rezhim_raboti") }}</b>
                </li>
                <li>
                  <span>{{ $t("contact.warehouse") }}: </span>

                  <b>
                    <span
                      class="locate"
                      v-for="(item, idx) in getValue('adresa_skladov')"
                      :key="idx"
                    >
                      {{ getLangValue(`adresa_skladov[${idx}].adres_sklada`)
                      }}<br
                    /></span>
                  </b>
                </li>
              </ul>
            </div>
          </div>
          <!-- //текст о компании -->
        </div>
      </div>
    </section>
    <!--// section о компании-->

    <section class="preFooter">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-8 col-sm-12">
            <h3>{{ getLangValue("forma_obratnoi_svyazi.zagolovok_formi") }}</h3>
          </div>
          <div class="col-lg-4 col-sm-12 btn-center">
            <div class="Button_page" @click="openModal">
              <div class="more-button-wrap">
                <span class="more-button-background">
                  <span class="more-button-ico"></span>
                </span>
                <span class="more-button-title">{{
                  getLangValue("forma_obratnoi_svyazi.tekst_knopki")
                }}</span>
              </div>
            </div>
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
  methods: {
    openModal() {
      this.$modal.open("review", {
        props: {
          type: "contact",
        },
      });
    },
  },
};
</script>

<style lang="scss" >
</style>