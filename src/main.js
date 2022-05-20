import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { VueCookieNext } from 'vue-cookie-next'

const app = createApp(App)
app.use(VueAxios, axios ) // 👈
app.use(VueCookieNext)
app.mount('#app')