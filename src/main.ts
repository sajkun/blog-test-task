import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './processes/router'

const pinia = createPinia()
const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives
})

app.use(vuetify).use(router).use(pinia).mount('#app')
