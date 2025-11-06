<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { authStore } from '@/store/auth.js'

const menuOpen = ref(false)
const userMenuOpen = ref(false)
const router = useRouter()

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  userMenuOpen.value = false // Tutup menu user jika menu utama dibuka
}

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
  menuOpen.value = false // Tutup menu utama jika menu user dibuka
}

const logout = () => {
  authStore.logout()
  router.push('/login')
  userMenuOpen.value = false
}
</script>

<template>
  <header class="bg-white shadow-lg sticky top-0 z-40">
    <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        
        <div class="flex-shrink-0">
          <RouterLink to="/" class="text-2xl font-extrabold text-blue-600 tracking-wider">
            Fish Hunter
          </RouterLink>
        </div>

        <nav class="hidden md:flex space-x-6">
          <RouterLink to="/" class="text-gray-700 hover:text-blue-600 font-medium transition duration-150">Home</RouterLink>
          <RouterLink to="/event" class="text-gray-700 hover:text-blue-600 font-medium transition duration-150">Event</RouterLink>
          <RouterLink to="/booking" class="text-gray-700 hover:text-blue-600 font-medium transition duration-150">Booking Saya</RouterLink>
          <RouterLink to="/catatan" class="text-gray-700 hover:text-blue-600 font-medium transition duration-150">Catatan</RouterLink>
        </nav>

        <div class="relative">
          <div v-if="authStore.user" class="flex items-center space-x-4">
            <button @click="toggleUserMenu" class="flex items-center p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition">
              <i class="fas fa-user-circle text-xl"></i>
            </button>
            
            <div v-if="userMenuOpen" @click.outside="userMenuOpen = false" class="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <RouterLink to="/profile" @click="userMenuOpen = false" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><i class="fas fa-id-card mr-2"></i>Profil</RouterLink>
              <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"><i class="fas fa-sign-out-alt mr-2"></i>Logout</button>
            </div>
          </div>
          
          <div v-else>
            <RouterLink to="/login" class="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
              Login
            </RouterLink>
          </div>
        </div>

        </div>
    </div>
    
    <div v-if="menuOpen" class="md:hidden">
        <RouterLink to="/" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</RouterLink>
        <RouterLink to="/event" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Event</RouterLink>
        <RouterLink to="/booking" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Booking Saya</RouterLink>
        <RouterLink to="/catatan" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Catatan</RouterLink>
    </div>
  </header>
</template>