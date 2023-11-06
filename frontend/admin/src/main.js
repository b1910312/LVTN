/* eslint-disable import/order */
    import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import { createApp } from 'vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import store from "./store";

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faPen, faGears, faTrash, faPlus, faLinkSlash, faReply, faStar, faEye, faSquareMinus, faEnvelope, faPaperPlane, faEllipsis, faXmark, faArrowsRotate, faLock, faUnlock, faSpinner, faMedal, faCheck } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faPen, faGears, faTrash, faPlus, faLinkSlash, faReply, faStar, faEye, faSquareMinus, faEnvelope, faPaperPlane, faEllipsis, faXmark, faArrowsRotate, faLock, faUnlock, faSpinner, faMedal, faCheck)
window.axios = axios;
loadFonts()

// Create vue app
const app = createApp(App)


// Use plugins
app.use(vuetify)
app.use(router)
app.use(store)
app.use(bootstrap)
app.component('font-awesome-icon', FontAwesomeIcon)
// Mount vue app
app.mount('#app')
