<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const events = ref([])
const router = useRouter()

onMounted(async () => {
  try {
    const res = await fetch('/data/events.json') 
    events.value = await res.json()
  } catch (error) {
    console.error("Gagal memuat data events.json:", error);
  }
})

const goToEventDetail = (id) => {
    router.push(`/event/${id}`) 
}

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('id-ID', options)
}
</script>

<template>
  <div class="bg-gray-50 min-h-full py-12 px-4">
    <div class="container mx-auto max-w-6xl">
      <h1 class="text-4xl font-extrabold text-blue-800 mb-8 border-b-4 border-yellow-400 pb-3">
        Halaman Utama Event
      </h1>

      <h2 class="text-2xl font-bold text-gray-700 mb-6">
        Cek Event yang Lagi Ramai Terus
      </h2>
      
      <div v-if="events.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div 
          v-for="event in events" 
          :key="event.id" 
          @click="goToEventDetail(event.id)"
          class="bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition duration-300 overflow-hidden cursor-pointer border border-gray-200"
        >
          <div class="relative">
              <img :src="event.image" :alt="event.title" class="w-full h-48 object-cover" />
              <span :class="['absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg', event.status === 'Daftar Sekarang' ? 'bg-red-600' : 'bg-green-600']">
                  {{ event.status }}
              </span>
          </div>
          
          <div class="p-5">
            <h3 class="text-xl font-bold mb-2 text-gray-800">{{ event.title }}</h3>
            
            <div class="space-y-1 text-sm text-gray-600 mb-4">
              <p class="flex items-center">
                <i class="fas fa-calendar-alt mr-2 text-blue-500"></i>
                <span>{{ formatDate(event.date) }}</span>
              </p>
              <p class="flex items-center">
                <i class="fas fa-map-marker-alt mr-2 text-red-500"></i>
                <span>{{ event.location }}</span>
              </p>
            </div>
            
            <div class="flex justify-between items-center border-t pt-3">
              <span class="text-lg font-bold text-green-600">{{ event.price }}</span>
              <span class="text-sm font-semibold text-yellow-600">Hadiah: {{ event.prize }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-10 bg-white rounded-lg shadow-lg">
        <p class="text-xl text-gray-600">
          <i class="fas fa-exclamation-triangle mr-2 text-yellow-500"></i>
          Belum ada Event yang tersedia saat ini.
        </p>
      </div>

    </div>
  </div>
</template>