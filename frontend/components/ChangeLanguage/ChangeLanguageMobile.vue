<template>
  <div class="switcher2">
    <div class="center">
      <span class="lang2">RU</span>
      <input type="checkbox" id="cbx2" :checked="isEng" @change="changeLanguage" style="display: none" />
      <label for="cbx2" class="toggle2"><span></span></label>
      <span class="lang2">EN</span>
    </div>
  </div>
</template>

<script>
import Mixin from "./ChangeLanguageMixin"
export default {
  mixins: [Mixin]
};
</script>

<style lang="scss" >
</style>