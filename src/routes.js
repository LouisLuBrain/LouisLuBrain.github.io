import ProfilePage from './pages/ProfilePage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    { path: '/', component: ProfilePage, icon: 'icon-mine' }
  ]
  
  export const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })
  