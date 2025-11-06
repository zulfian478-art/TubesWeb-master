<template>
  <div class="min-h-screen flex items-center justify-center bg-green-50 p-4">
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-8 border-green-600">
      <h2 class="text-3xl font-extrabold mb-2 text-center text-green-700">Buat Akun Baru</h2>
      <p class="text-center text-gray-500 mb-6">Daftar untuk mulai menjelajahi spot mancing terbaik!</p>
      
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input 
            id="username"
            v-model="username" 
            placeholder="Buat username unik" 
            class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
            required
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="Minimal 6 karakter" 
            class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
            minlength="6"
            required
          />
        </div>
        
        <button 
          type="submit" 
          class="w-full bg-green-600 text-white py-3 mt-4 rounded-lg text-lg font-bold hover:bg-green-700 transition duration-300 shadow-md"
        >
          <i class="fas fa-user-plus mr-2"></i>Daftar Sekarang
        </button>
      </form>
      
      <p class="text-sm mt-6 text-center text-gray-600">
        Sudah punya akun? 
        <RouterLink to="/login" class="text-blue-600 font-semibold hover:underline">Login di sini</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { authStore } from '@/store/auth.js'

const router = useRouter()
const username = ref('')
const password = ref('')

function handleRegister() {
  if (password.value.length < 6) {
    alert('Password minimal 6 karakter.')
    return
  }
  
  authStore.register(username.value, password.value)
  alert('Registrasi berhasil! Silakan login dengan akun yang baru Anda buat.')
  router.push('/login')
}
</script>