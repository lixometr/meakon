<template>
  <Label :label="label" :required="required" class="t-input">
    <vue-editor
      :editorOptions="editorSettings"
      :useCustomImageHandler="true"
      @image-added="handleImageAdded"
      v-model="inputValue"
      :editor-toolbar="editorToolbar"
    />
  </Label>
</template>

<script>
import axios from "axios";
export default {
  props: {
    value: String,
    label: String,
    required: Boolean,
  },
  data() {
    return {
      editorSettings: {
        modules: {
          imageResize: true,
          htmlEditButton: true,
        },
      },

      editorToolbar: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        // ["blockquote", "code-block"],

        [{ header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

        // [{ header: [ 2] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme

        ["clean"],
        ["image", "video", "link", "table"],
      ],
    };
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        const { data: result } = await this.$api.post(
          "uploadImage",
          null,
          formData
        );
        let url = result.url;
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>