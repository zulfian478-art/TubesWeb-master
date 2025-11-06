// src/store/catchStore.js
import { reactive } from 'vue'

// Ambil data dari localStorage atau inisiasi array kosong
const storedCatches = JSON.parse(localStorage.getItem('fishingCatches')) || []

export const catchStore = reactive({
  catches: storedCatches,

  addCatch(newCatch) {
    // Tambahkan ID unik sederhana dan tanggal
    const catchWithId = {
      ...newCatch,
      id: Date.now(),
      date: new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    this.catches.push(catchWithId)
    this.saveCatches()
  },

  saveCatches() {
    localStorage.setItem('fishingCatches', JSON.stringify(this.catches))
  },
  
  // Fungsi untuk mendapatkan total hasil tangkapan di suatu tempat
  getCatchesByLocation(location) {
    return this.catches.filter(c => c.location === location)
  }
})