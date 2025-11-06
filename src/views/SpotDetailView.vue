<script setup>
import { ref, onMounted } from 'vue'
import { bookingStore } from '@/store/bookingStore.js' // Import store booking

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const spot = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('/data/fishing.json')
    const spots = await res.json()
    spot.value = spots.find(s => s.id == props.id)
  } catch (error) {
    console.error("Gagal memuat data detail spot:", error)
  }
})

const handleBooking = () => {
    if (!spot.value) return;
    
    // Asumsi default pemesanan 1 jam
    bookingStore.addBooking({
        spotName: spot.value.name,
        spotLocation: spot.value.location,
        price: spot.value.price,
        duration: '1 Jam'
    })
    alert(`Pemesanan di ${spot.value.name} berhasil ditambahkan ke Booking Saya!`)
}
</script>

<template>
  <div class="bg-gray-50 min-h-full py-12 px-4">
    <div class="container mx-auto max-w-4xl">
      
      <div v-if="spot" class="bg-white rounded-lg shadow-2xl overflow-hidden">
        
        <img :src="spot.image" :alt="spot.name" class="w-full h-80 object-cover" />
        
        <div class="p-6 md:p-8">
          <div class="flex justify-between items-start border-b pb-4 mb-4">
            <h1 class="text-3xl font-bold text-blue-700">{{ spot.name }}</h1>
            <span class="text-3xl font-extrabold text-green-600">{{ spot.price }}</span>
          </div>
          
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center text-gray-600">
              <i class="fas fa-map-marker-alt mr-2 text-red-500"></i>
              <span class="text-lg">{{ spot.location }}</span>
            </div>
            <div class="flex items-center text-yellow-500 text-lg font-semibold">
              <i class="fas fa-star mr-1"></i>
              <span>{{ spot.rating || 'N/A' }} Rating</span>
            </div>
          </div>

          <h2 class="text-xl font-bold mb-3 text-gray-800">Deskripsi Tempat</h2>
          <p class="text-gray-700 mb-8 leading-relaxed">
            {{ spot.description || 'Deskripsi belum tersedia untuk spot ini. Namun, tempat ini terkenal dengan ikan...' }}
          </p>

          <h2 class="text-xl font-bold mb-4 text-gray-800">List Ikan yang Ada</h2>
          <ul class="list-disc list-inside text-gray-700 space-y-2 mb-8">
            <li>Ikan Mas (Goldfish)</li>
            <li>Ikan Patin (Pangasius)</li>
            <li>Ikan Bawal (Pomfret)</li>
          </ul>

          <button 
            class="w-full bg-blue-600 text-white py-3 rounded-lg text-xl font-bold hover:bg-blue-700 transition duration-300 shadow-lg"
            @click="handleBooking" 
          >
            Pesan Sekarang!
          </button>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <h1 class="text-3xl font-bold text-red-500">Spot tidak ditemukan 😭</h1>
        <RouterLink to="/" class="mt-4 inline-block text-blue-600 hover:underline">Kembali ke Home</RouterLink>
      </div>
    </div>
  </div>
</template>