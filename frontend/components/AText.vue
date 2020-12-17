<template>
    <div>
        <div v-html="text"></div>
    </div>
</template>

<script>
    export default {
        props: {
            text: String
        }
    }
</script>

<style lang="scss" >

</style>