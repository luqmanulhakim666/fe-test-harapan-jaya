// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import '@/assets/tailwind.css'
import vuetify from '@/plugins/vuetify'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import { useAuthStore } from '@/stores/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(Toast, { position: 'top-right', timeout: 2500 })

const auth = useAuthStore()
auth.getMe().finally(() => {
  app.mount('#app')
})
