import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import Vuelidate from 'vuelidate'
import VueCookie from 'vue-cookie';
import vSelect from 'vue-select'
import VueUploadComponent from 'vue-upload-component';
import VModal from 'vue-js-modal'
import Notifications from 'vue-notification'
import ToggleButton from 'vue-js-toggle-button'

import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store/store'
import Api from "@/plugins/axios";
import Loading from "@/plugins/loading";
import HandleError from "@/plugins/error";
import VueMoment from "vue-moment";
import "@/plugins/editor";

const moment = require('moment')
Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(VueCookie);
Vue.use(VModal);
Vue.use(ToggleButton)

Vue.use(Notifications, {
  group: "main"
})
Vue.use(Vuelidate)
Vue.use(HandleError, Vue.notify)
Vue.use(Loading, store)
Vue.use(Api, store)

import 'vue-select/dist/vue-select.css';
Vue.component('v-select', vSelect)

Vue.component('file-upload', VueUploadComponent)
require('moment/locale/ru')



Vue.use(VueMoment, {
  moment
});

Vue.prototype.$log = console.log.bind(console)

import Label from "@/components/Label";
import AInput from "@/components/AInput";
import NInput from "@/components/NInput";
import ATextArea from "@/components/ATextArea";
import BtnAdd from "@/components/BtnAdd";
import BtnSave from "@/components/BtnSave";
import AppPagination from "@/components/AppPagination";
import EditComponent from "@/components/Edit/EditComponent";
import ACheckbox from "@/components/ACheckbox";
import SeoEdit from "@/components/Edit/SeoEdit"
import CollapseCard from "@/components/CollapseCard"
Vue.component('Label', Label)
Vue.component('AInput', AInput)
Vue.component('NInput', NInput)
Vue.component('BtnAdd', BtnAdd)
Vue.component('BtnSave', BtnSave)
Vue.component('AppPagination', AppPagination)
Vue.component('EditComponent', EditComponent)
Vue.component('ATextArea', ATextArea)
Vue.component('ACheckbox', ACheckbox)
Vue.component('SeoEdit', SeoEdit)
Vue.component('CollapseCard', CollapseCard)
const init = async () => {
  await store.dispatch('init')
  new Vue({
    el: '#app',
    router,
    store,
    icons,

    render: h => h(App)
  })
}

init()