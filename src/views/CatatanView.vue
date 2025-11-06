<script setup>
import { catchStore } from '@/store/catchStore.js'
import { ref } from 'vue'

const isModalOpen = ref(false)
const newCatch = ref({
  fishName: '',
  weight: null, // dalam kg
  location: '',
  notes: ''
})

const openModal = () => { isModalOpen.value = true }
const closeModal = () => { isModalOpen.value = false }

const submitCatch = () => {
  if (newCatch.value.fishName && newCatch.value.location && newCatch.value.weight) {
    catchStore.addCatch(newCatch.value)
    newCatch.value = { fishName: '', weight: null, location: '', notes: '' }
    closeModal()
  } else {
    alert('Nama Ikan, Berat, dan Lokasi wajib diisi!')
  }
}
</script>

<template>
  <div class="bg-gray-50 min-h-full py-12 px-4">
    <div class="container mx-auto max-w-4xl">
      
      <div class="flex justify-between items-center mb-8 border-b pb-4">
        <h1 class="text-3xl font-bold text-blue-700">Catatan Hasil Tangkapan</h1>
        <button 
          @click="openModal"
          class="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition shadow-md"
        >
          <i class="fas fa-plus mr-2"></i>Tambah Catatan
        </button>
      </div>

      <div v-if="catchStore.catches.length > 0" class="space-y-6">
        <div 
          v-for="catatan in catchStore.catches.slice().reverse()" 
          :key="catatan.id"
          class="bg-white p-5 rounded-xl shadow-lg border-l-4 border-blue-500"
        >
          <div class="flex justify-between items-start mb-2">
            <h2 class="text-xl font-bold text-gray-800">{{ catatan.fishName }}</h2>
            <span class="text-sm text-gray-500">{{ catatan.date }}</span>
          </div>
          
          <div class="grid grid-cols-2 gap-2 text-gray-700 mb-3">
            <p>
              <i class="fas fa-map-marker-alt mr-2 text-red-500"></i>
              Lokasi: <strong>{{ catatan.location }}</strong>
            </p>
            <p>
              <i class="fas fa-weight-hanging mr-2 text-green-600"></i>
              Berat: <strong>{{ catatan.weight }} kg</strong>
            </p>
          </div>
          
          <p v-if="catatan.notes" class="text-sm italic text-gray-600 border-t pt-2 mt-2">
            Catatan: {{ catatan.notes }}
          </p>
        </div>
      </div>
      
      <div v-else class="text-center py-20 bg-white rounded-lg shadow-md">
        <p class="text-xl text-gray-500">Belum ada catatan hasil tangkapan. Yuk, mancing!</p>
      </div>

      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
          <div class="flex justify-between items-center border-b pb-3 mb-4">
            <h3 class="text-2xl font-bold">Tambah Catatan Baru</h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-800 text-2xl">×</button>
          </div>
          
          <form @submit.prevent="submitCatch" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nama Ikan</label>
              <input type="text" v-model="newCatch.fishName" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Berat (kg)</label>
              <input type="number" v-model.number="newCatch.weight" step="0.01" min="0.01" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Lokasi Mancing</label>
              <input type="text" v-model="newCatch.location" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Catatan Tambahan (Opsional)</label>
              <textarea v-model="newCatch.notes" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
            </div>
            
            <div class="pt-4 border-t flex justify-end space-x-3">
              <button type="button" @click="closeModal" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Batal</button>
              <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Simpan Catatan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>