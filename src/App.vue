<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue' // Import Navbar

</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Navbar /> 

    <main class="flex-grow">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Pastikan tidak ada style CSS yang mengganggu full screen dan centering */
/* File src/assets/main.css harus hanya berisi Tailwind dan base imports */
</style>