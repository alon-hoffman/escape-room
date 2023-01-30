import { createRouter, createWebHashHistory } from 'vue-router'

import home from './views/home.vue'
import chat from './views/chat.vue'
import gameObjectApp from './views/game-app.vue'
import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import userDetails from './views/user-details.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/gameObject',
    name: 'game-app',
    component: gameObjectApp
  },
  {
    path: '/review',
    name: 'review',
    component: reviewApp
  },
  {
    path: '/chat',
    name: 'chat',
    component: chat
  },
  {
    path: '/login',
    name: 'loginSignup',
    component: loginSignup
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  }
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

