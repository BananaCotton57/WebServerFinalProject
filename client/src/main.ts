import './assets/main.css'

import { createApp } from 'vue'
import { Autocomplete } from '@oruga-ui/oruga-next'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.use(Autocomplete)

app.mount('#app')
