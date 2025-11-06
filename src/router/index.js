// src/router/index.js (FINAL & LENGKAP)

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue' 
import SpotDetailView from '../views/SpotDetailView.vue' 
import CatatanView from '../views/CatatanView.vue'
import EventView from '../views/EventView.vue'
import EventDetailView from '../views/EventDetailView.vue' 
import BookingView from '../views/BookingView.vue' // Tambahkan import ini!

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Rute Utama & Otentikasi
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/profile', name: 'profile', component: ProfileView },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },

    // Rute Fungsionalitas Aplikasi
    { 
        path: '/spot/:id', 
        name: 'spot-detail', 
        component: SpotDetailView, 
        props: true 
    },
    { path: '/catatan', name: 'catatan', component: CatatanView },
    
    // Rute Event
    { path: '/event', name: 'event', component: EventView },
    { 
        path: '/event/:id', 
        name: 'event-detail', 
        component: EventDetailView,
        props: true
    },

    // Rute Booking (FINAL)
    { path: '/booking', name: 'booking', component: BookingView }, 
  ],
})

export default router