<template>
  <CButton color="primary" v-on="$listeners" v-bind="$attrs">
    <slot></slot>
    <CIcon class="ml-1" name="cib-addthis" />
  </CButton>
</template>

<script>
export default {};
</script>

