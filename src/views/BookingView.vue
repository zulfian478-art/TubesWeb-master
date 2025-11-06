<script setup>
import { bookingStore } from '@/store/bookingStore.js'
import { authStore } from '@/store/auth.js'
import { useRouter } from 'vue-router'

const router = useRouter()

// Redirect jika belum login
if (!authStore.user) {
    router.push('/login')
}

const handleCancel = (id) => {
    if (confirm("Apakah Anda yakin ingin membatalkan pesanan ini?")) {
        bookingStore.cancelBooking(id)
    }
}
</script>

<template>
  <div class="bg-gray-50 min-h-full py-12 px-4">
    <div class="container mx-auto max-w-4xl">
      <h1 class="text-4xl font-extrabold text-blue-700 mb-8 border-b-2 pb-2">
        Booking Saya <i class="fas fa-ticket-alt text-xl ml-2"></i>
      </h1>

      <h2 class="text-2xl font-bold text-gray-700 mb-6">
        Cek Pesanan Kamu Disini
      </h2>
      
      <div v-if="bookingStore.bookings.length > 0" class="space-y-6">
        <div 
          v-for="booking in bookingStore.bookings.slice().reverse()" 
          :key="booking.id"
          :class="['bg-white p-5 rounded-xl shadow-lg border-l-4', booking.status === 'Aktif' ? 'border-green-500' : 'border-red-500']"
        >
          <div class="flex justify-between items-start mb-2">
            <h2 class="text-xl font-bold text-gray-800">{{ booking.spotName }}</h2>
            <span :class="['text-sm font-bold px-3 py-1 rounded-full', booking.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']">
                {{ booking.status }}
            </span>
          </div>
          
          <div class="grid grid-cols-2 gap-2 text-gray-700 mb-4">
            <p>
              <i class="fas fa-map-marker-alt mr-2 text-red-500"></i>
              Lokasi: <strong>{{ booking.spotLocation }}</strong>
            </p>
            <p>
              <i class="fas fa-clock mr-2 text-blue-500"></i>
              Durasi: <strong>{{ booking.duration }}</strong>
            </p>
            <p>
              <i class="fas fa-calendar-day mr-2 text-gray-500"></i>
              Tgl Pesan: <strong>{{ booking.dateBooked }}</strong>
            </p>
            <p>
              <i class="fas fa-money-bill-wave mr-2 text-green-600"></i>
              Total Biaya: <strong>{{ booking.price }}</strong>
            </p>
          </div>

          <button 
            v-if="booking.status === 'Aktif'"
            @click="handleCancel(booking.id)"
            class="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition"
          >
            <i class="fas fa-times-circle mr-1"></i> Batalkan Pesanan
          </button>
        </div>
      </div>
      
      <div v-else class="text-center py-20 bg-white rounded-lg shadow-md">
        <p class="text-xl text-gray-500">Anda belum memiliki pesanan aktif.</p>
        <RouterLink to="/" class="mt-4 inline-block text-blue-600 hover:underline font-semibold">
            Pesan Spot Sekarang
        </RouterLink>
      </div>

    </div>
  </div>
</template>