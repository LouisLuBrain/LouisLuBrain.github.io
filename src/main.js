import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routes'
import './App.css'
const app = createApp(App)

app.use(router)

app.mount('#app')
