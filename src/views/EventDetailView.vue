<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const event = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('/data/events.json')
    const events = await res.json()
    event.value = events.find(e => e.id == props.id)
  } catch (error) {
    console.error("Gagal memuat data detail event:", error)
  }
})

const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('id-ID', options)
}

const goToLeaderboard = () => {
    alert('Fungsi Leaderboard akan diimplementasikan kemudian.')
}
</script>

<template>
  <div class="bg-gray-50 min-h-full py-12 px-4">
    <div class="container mx-auto max-w-4xl">
      
      <div v-if="event" class="bg-white rounded-lg shadow-2xl overflow-hidden">
        
        <img :src="event.image" :alt="event.title" class="w-full h-80 object-cover" />
        
        <div class="p-6 md:p-8">
          <div class="flex justify-between items-center border-b pb-4 mb-4">
            <h1 class="text-3xl font-bold text-blue-700">{{ event.title }}</h1>
            <span :class="['text-sm font-bold px-3 py-1 rounded-full shadow-lg', event.status === 'Daftar Sekarang' ? 'bg-red-600 text-white' : 'bg-green-600 text-white']">
                {{ event.status }}
            </span>
          </div>
          
          <div class="space-y-4 mb-8">
              <p class="text-lg flex items-center">
                  <i class="fas fa-calendar-check mr-3 text-2xl text-blue-500"></i>
                  <span class="font-semibold text-gray-700">Tanggal:</span> 
                  <span class="ml-2 text-gray-900">{{ formatDate(event.date) }}</span>
              </p>
              <p class="text-lg flex items-center">
                  <i class="fas fa-map-marked-alt mr-3 text-2xl text-red-500"></i>
                  <span class="font-semibold text-gray-700">Lokasi:</span> 
                  <span class="ml-2 text-gray-900">{{ event.location }}</span>
              </p>
              <p class="text-lg flex items-center">
                  <i class="fas fa-trophy mr-3 text-2xl text-yellow-500"></i>
                  <span class="font-semibold text-gray-700">Hadiah Utama:</span> 
                  <span class="ml-2 text-gray-900 font-bold">{{ event.prize }}</span>
              </p>
              <p class="text-lg flex items-center">
                  <i class="fas fa-money-bill-wave mr-3 text-2xl text-green-500"></i>
                  <span class="font-semibold text-gray-700">Biaya Pendaftaran:</span> 
                  <span class="ml-2 text-gray-900 font-bold">{{ event.price }}</span>
              </p>
          </div>

          <h2 class="text-xl font-bold mb-3 text-gray-800 border-t pt-4">Deskripsi Event</h2>
          <p class="text-gray-700 mb-8 leading-relaxed">
            {{ event.description || 'Deskripsi belum tersedia. Event ini menjanjikan keseruan dan hadiah yang luar biasa!' }}
          </p>

          <div class="flex flex-col space-y-3">
              <button 
                  class="w-full bg-blue-600 text-white py-3 rounded-lg text-xl font-bold hover:bg-blue-700 transition duration-300 shadow-lg disabled:bg-gray-400"
                  :disabled="event.status === 'Segera'"
                  @click="alert(`Anda mendaftar untuk ${event.title}`)"
              >
                  {{ event.status === 'Daftar Sekarang' ? 'Daftar Event' : 'Event Akan Datang' }}
              </button>
              <button 
                  v-if="event.status === 'Daftar Sekarang'"
                  class="w-full bg-yellow-500 text-blue-900 py-3 rounded-lg text-lg font-bold hover:bg-yellow-600 transition duration-300 shadow-md"
                  @click="goToLeaderboard"
              >
                  <i class="fas fa-list-ol mr-2"></i> Cek Leaderboard Sementara
              </button>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <h1 class="text-3xl font-bold text-red-500">Event tidak ditemukan 😭</h1>
        <RouterLink to="/event" class="mt-4 inline-block text-blue-600 hover:underline">Kembali ke Daftar Event</RouterLink>
      </div>
    </div>
  </div>
</template>