import Vue from "vue";
import Vue2Editor from "vue2-editor";
import ImageResize from "quill-image-resize-module";
import { Quill } from "vue2-editor";
import { htmlEditButton } from "quill-html-edit-button";
// import QuillBetterTable from 'quill-better-table'

Quill.register("modules/htmlEditButton", htmlEditButton);

// Quill.register({
//     'modules/better-table': QuillBetterTable
// }, true)


Quill.register("modules/imageResize", ImageResize);

Vue.use(Vue2Editor);