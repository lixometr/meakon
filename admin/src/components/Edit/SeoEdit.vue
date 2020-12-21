<template>
   <CCard >
      <CCardHeader>Seo блок</CCardHeader>
      <CCardBody>
        <EditComponent
          v-for="(item, idx) in items"
          :key="idx"
          v-bind="item"
          :changeValue.sync="valuesModel"
        />
      </CCardBody>
    </CCard>
</template>

<script>
export default {
    props: {
        value: Object,
    },
    
    computed: {
        valuesModel: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        },
        items() {
            return [
                {
                    c: "AInput",
                    v: "seo.title",
                    label: "Title"
                },
                {
                    c: "AInput",
                    v: "seo.description",
                    label: "Description"
                },
                {
                    c: "AInput",
                    v: "seo.keywords",
                    label: "Keywords"
                },
            ]
        }
    }
}
</script>

<style>

</style>