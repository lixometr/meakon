<template>
  <CFooter :fixed="false">
    <div>
      <a :href="$store.getters.frontUrl" target="_blank">{{$store.getters.frontUrl}}</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} </span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank">Developed in</span>
      <a href="https://www.stebnev-studio.ru" target="_blank">Stebnev-Studio</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
