<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const fishingSpots = ref([])
const searchQuery = ref('')
const router = useRouter()

onMounted(async () => {
  try {
    const res = await fetch('/data/fishing.json') 
    fishingSpots.value = await res.json()
  } catch (error) {
    console.error("Gagal memuat data fishing.json:", error);
  }
})

const filteredSpots = computed(() => {
  if (!searchQuery.value) {
    return fishingSpots.value
  }
  const query = searchQuery.value.toLowerCase()
  return fishingSpots.value.filter(spot =>
    spot.name.toLowerCase().includes(query) ||
    spot.location.toLowerCase().includes(query)
  )
})

const goToDetail = (id) => {
    router.push(`/spot/${id}`) 
}
</script>

<template>
  <div class="bg-gray-50 min-h-full">
    
    <div class="relative bg-blue-700 text-white py-20 px-4 shadow-xl">
      <div class="container mx-auto max-w-5xl text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-8">
          Temukan Spot Mancing Impian Anda!
        </h1>

        <div class="flex max-w-lg mx-auto bg-white rounded-full shadow-2xl overflow-hidden border-4 border-yellow-400">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Cari nama spot, lokasi, atau jenis ikan..."
            class="flex-grow p-4 text-gray-800 border-none focus:outline-none placeholder-gray-500"
          />
          <button 
            class="bg-yellow-400 text-blue-800 px-6 hover:bg-yellow-500 transition duration-300 font-bold"
            @click="() => {}" >
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>

    <section class="py-12 px-4 md:px-8">
      <div class="container mx-auto max-w-6xl">
        <h2 class="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">
          Daftar Spot Pemancingan Populer
        </h2>
        
        <div v-if="filteredSpots.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div 
            v-for="spot in filteredSpots" 
            :key="spot.id" 
            @click="goToDetail(spot.id)"
            class="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition duration-300 overflow-hidden border border-gray-200 cursor-pointer"
          >
            <img :src="spot.image" :alt="spot.name" class="w-full h-48 object-cover" />
            
            <div class="p-5">
              <h3 class="text-xl font-bold mb-2 text-blue-700">{{ spot.name }}</h3>
              
              <div class="flex items-center text-sm text-gray-500 mb-3">
                <i class="fas fa-map-marker-alt mr-2 text-red-500"></i>
                <span>{{ spot.location }}</span>
              </div>
              
              <div class="flex justify-between items-center mb-4 border-t pt-3">
                <span class="text-lg font-extrabold text-green-600">{{ spot.price }}</span>
                <div class="flex items-center text-yellow-500 font-semibold">
                  <i class="fas fa-star mr-1"></i>
                  <span>{{ spot.rating || 'N/A' }}</span> 
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-10 bg-white rounded-lg shadow-lg">
          <p class="text-xl text-gray-600">
            <i class="fas fa-exclamation-triangle mr-2 text-yellow-500"></i>
            Maaf, tidak ada spot yang ditemukan.
          </p>
        </div>

      </div>
    </section>
  </div>
</template>