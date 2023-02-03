import { createApp } from 'vue'
import { setupRouter } from '@/router'
import App from '@/App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './permission'
function initApp() {
  const app = createApp(App)
  setupRouter(app)
  app.use(Antd).mount('#app')
}
initApp()
