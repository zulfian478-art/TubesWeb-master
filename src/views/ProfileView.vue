<script setup>
import { authStore } from '@/store/auth.js'
</script>

<template>
  <div class="bg-gray-50 min-h-full py-12 px-4">
    <div class="container mx-auto max-w-xl">
      <div class="bg-white p-8 rounded-xl shadow-2xl text-center">
        <i class="fas fa-user-circle text-6xl text-blue-600 mb-4"></i>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Profil Pengguna</h1>
        <p class="text-gray-500 mb-6">Detail akun Anda saat ini.</p>

        <div class="space-y-4 text-left">
          <div class="border-b pb-2">
            <p class="text-sm text-gray-500">Username:</p>
            <p class="text-lg font-semibold text-gray-900">{{ authStore.user?.username || 'Guest' }}</p>
          </div>
          <div class="border-b pb-2">
            <p class="text-sm text-gray-500">Role:</p>
            <p class="text-lg font-semibold text-gray-900">{{ authStore.user?.role || 'Pengguna Biasa' }}</p>
          </div>
        </div>
        
        <button 
          @click="authStore.logout()"
          class="mt-8 bg-red-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          <i class="fas fa-sign-out-alt mr-2"></i>Logout
        </button>
      </div>
    </div>
  </div>
</template>