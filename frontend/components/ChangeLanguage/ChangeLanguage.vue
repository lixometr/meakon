<template>
  <!-- switcher -->
  <div class="switcher">
    <div class="center">
      <span class="lang" @click="changeLanguage">RU</span>
      <input type="checkbox" :checked="isEng" @change="changeLanguage" id="cbx" style="display: none" />
      <label for="cbx" class="toggle"><span></span></label>
      <span class="lang" @click="changeLanguage">ENG</span>
    </div>
  </div>
  <!-- //switcher -->
</template>

<script>
import Mixin from "./ChangeLanguageMixin";

export default {
  mixins: [Mixin],
};
</script>

<style lang="scss" >
</style>