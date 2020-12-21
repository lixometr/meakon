<template>
  <div :style="{width: width}" class="position-relative">
    
 
    <div class="reset-btn bg-danger" @click="reset" v-if="value && !showInfo">
      <span>&times;</span>
    </div>

    <file-upload
      class="upload w-100 "
      :class="{'p-4': showInfo}"
      :input-id="inputId"
      ref="upload"
      v-model="files"
      :custom-action="doUpload"
      :drop="true"
      @input-file="inputFile"
      @input-filter="inputFilter"
    >
     
      <div v-if="value">{{value}}</div>
      <CIcon name="cil-cloud-upload" width="100%" v-else :style="{maxWidth: '300px'}" />
    </file-upload>
  </div>
</template>

<script>
export default {
  props: {
    // url
    value: String,
    width: String,
    showInfo: Boolean
  },
  data() {
    return {
      files: [],
    };
  },
  computed: {
    inputId() {
      return 'file-upload-'+this._uid
    }
  },
  methods: {
    reset() {
      this.$emit('input', undefined)
    },
    async doUpload(file, component) {
      try {
        const formData = new FormData();
        
        formData.append("file", file.file);
        const { data: result } = await this.$api.post(
          "uploadFile",
          null,
          formData
        );
        this.$emit("input", result.url);
      } catch (err) {
        this.$error(err);
      }
    },
    inputFile(newFile, oldFile) {
      this.$refs.upload.active = true;

      // if (newFile && oldFile && !newFile.active && oldFile.active) {
      //   console.log('hey', newFile)
      // }
    },
    /**
     * Pretreatment
     * @param  Object|undefined   newFile   Read and write
     * @param  Object|undefined   oldFile   Read only
     * @param  Function           prevent   Prevent changing
     */
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Filter file file
        // if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
        //   return prevent();
        // }
      }

      // Create a blob field
      newFile.blob = "";
      let URL = window.URL || window.webkitURL;
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.upload {
  cursor: pointer;
}
.upload-file {
  max-width: 100%;
  cursor: pointer;
}
.reset-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 18px;
  cursor: pointer;
  width: 15px;
  height: 15px;
  line-height: 12px;
  padding: 0;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  z-index: 2;
}
</style>