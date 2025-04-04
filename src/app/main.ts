import './main.css'

import App from '@/novel/NovelGame.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
