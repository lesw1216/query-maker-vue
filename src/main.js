import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { globalMethods } from '@/api/globalMethods'
import './styles.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.provide('$globalMethods', globalMethods)

app.mount('#app')
