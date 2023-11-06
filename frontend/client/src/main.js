import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { library } from '@fortawesome/fontawesome-svg-core'
import router from '@/router'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faPen, faGears, faTrash, faPlus, faLinkSlash, faReply, faStar, faEye, faSquareMinus, faEnvelope, faPaperPlane, faEllipsis, faXmark, faArrowsRotate, faPhone, faMapLocationDot, faLock, faUnlock, faSpinner, faMedal, faCheck, faUserCircle, faDoorOpen } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faPen, faGears, faTrash, faPlus, faLinkSlash, faReply, faStar, faEye, faSquareMinus, faEnvelope, faPaperPlane, faEllipsis, faXmark, faArrowsRotate, faPhone, faMapLocationDot, faLock, faUnlock, faSpinner, faMedal, faCheck, faUserCircle, faDoorOpen)
const vuetify = createVuetify({
  components,
  directives,
})


import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
const app = createApp(App)
app.use(bootstrap)
app.use(vuetify)
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
