import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})


import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
const app = createApp(App)
app.use(bootstrap)
app.use(vuetify)

app.mount('#app')
