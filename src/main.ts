import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Ant Design
import 'ant-design-vue/dist/reset.css'

// Vue Router
import router from './router' 

// Pinia
import { createPinia } from 'pinia'  

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
