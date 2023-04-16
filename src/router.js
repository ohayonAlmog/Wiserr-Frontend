import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import Chat from './views/Chat.vue'
import GigIndex from './views/GigIndex.vue'
import ReviewIndex from './views/ReviewIndex.vue'
import LoginSignup from './views/LoginSignup.vue'
import UserDetails from './views/UserDetails.vue'
import GigDeatails from './views/GigDetails.vue'
import GigEdit from './views/GigEdit.vue'
import GigPayment from './views/GigPayment.vue'
import SellerRegister from './views/SellerRegister.vue'
import SellerProfile from './views/SellerProfile.vue'
import SellerOrders from './views/SellerOrders.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/explore',
    name: 'GigIndex',
    component: GigIndex
  },
  {
    path: '/gig/edit/:gigId?',
    component: GigEdit
  },
  {
    path: '/gig/:gigId',
    component: GigDeatails
  },
  {
    path: '/gig/payment/:gigId',
    component: GigPayment
  },
  {
    path: '/review',
    name: 'ReviewIndex',
    component: ReviewIndex
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/login',
    name: 'LoginSignup',
    component: LoginSignup
  },
  {
    path: '/user/:id',
    name: 'UserDetails',
    component: UserDetails
  },
  {
    path: '/seller/register',
    name: 'SellerRegister',
    component: SellerRegister
  },
  {
    path: '/seller/profile',
    name: 'SellerProfile',
    component: SellerProfile
  },
  {
    path: '/seller/orders',
    name: 'SellerOrders',
    component: SellerOrders
  },
]

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 150,
      }
    }
  },
})