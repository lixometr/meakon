<template>
  <div>
    <!-- mobileMenu -->
    <header class="header">
      <div class="mlogo"><img src="assets/img/mobile_logo.png" alt="" /></div>
      <div class="mswaper">
        <div class="switcher2">
          <div class="center">
            <span class="lang2">RU</span>
            <input type="checkbox" id="cbx2" style="display: none" />
            <label for="cbx2" class="toggle2"><span></span></label>
            <span class="lang2">ENG</span>
          </div>
        </div>
      </div>

      <div class="burger">
        <div class="burger__patty"></div>
        <div class="burger__patty"></div>
        <div class="burger__patty"></div>
      </div>

      <nav class="menu">
        <div class="menu__brand"></div>
        <ul class="menu__list">
          <li class="menu__item">
            <a href="products.html" class="menu__link" target="">Продукция</a>
          </li>
          <li class="menu__item">
            <a href="about.html" class="menu__link" target="">О компании</a>
          </li>
          <li class="menu__item">
            <a href="contacts.html" class="menu__link" target="">Контакты</a>
          </li>

          <li class="menu__item">
            <a href="tel:+78009998877" class="tel__link">+7 800 999 88 77</a>
          </li>
        </ul>
      </nav>
    </header>

    <section class="hero"></section>
    <!-- //mobileMenu -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" >
</style>