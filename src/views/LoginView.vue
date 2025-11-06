<template>
  <div class="min-h-screen flex items-center justify-center bg-blue-100 p-4">
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-8 border-blue-600">
      <h2 class="text-3xl font-extrabold mb-2 text-center text-blue-800">Selamat Datang Kembali!</h2>
      <p class="text-center text-gray-500 mb-6">Silakan masuk ke akun Fish Hunter Anda.</p>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input 
            id="username"
            v-model="username" 
            placeholder="Masukkan username Anda" 
            class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
            required
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="******" 
            class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
            required
          />
        </div>
        
        <button 
          type="submit" 
          class="w-full bg-blue-600 text-white py-3 mt-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300 shadow-md"
        >
          <i class="fas fa-sign-in-alt mr-2"></i>Login
        </button>
      </form>
      
      <p class="text-sm mt-6 text-center text-gray-600">
        Belum punya akun? 
        <RouterLink to="/register" class="text-blue-600 font-semibold hover:underline">Daftar di sini</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { authStore } from '@/store/auth.js'

const router = useRouter()
const username = ref('admin') // Default for easy testing
const password = ref('1234') // Default for easy testing

function handleLogin() {
  if (authStore.login(username.value, password.value)) {
    router.push('/')
  } else {
    alert('Username atau password salah! Coba "admin" dan "1234" (default)')
  }
}
</script>