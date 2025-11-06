// src/store/bookingStore.js (Penyimpanan Booking)
import { reactive } from 'vue'

const storedBookings = JSON.parse(localStorage.getItem('fishingBookings')) || []

export const bookingStore = reactive({
  bookings: storedBookings,

  addBooking(newBooking) {
    const bookingWithId = {
      ...newBooking,
      id: Date.now(),
      status: 'Aktif',
      dateBooked: new Date().toLocaleDateString('id-ID')
    }
    this.bookings.push(bookingWithId)
    this.saveBookings()
  },

  cancelBooking(id) {
    const index = this.bookings.findIndex(b => b.id === id)
    if (index !== -1) {
        this.bookings[index].status = 'Dibatalkan'
        this.saveBookings()
        return true
    }
    return false
  },

  saveBookings() {
    localStorage.setItem('fishingBookings', JSON.stringify(this.bookings))
  }
})