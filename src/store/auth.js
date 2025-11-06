// src/store/auth.js (Simulasi Otentikasi)
import { reactive } from 'vue'

export const authStore = reactive({
  user: JSON.parse(localStorage.getItem('user')) || null,

  login(username, password) {
    // Default akun: admin/1234
    if (username === 'admin' && password === '1234') {
      this.user = { username, role: 'admin' }
      localStorage.setItem('user', JSON.stringify(this.user))
      return true
    }
    return false
  },

  register(username, password) {
    // Dalam aplikasi nyata, ini akan mengirim ke API
    console.log(`User registered: ${username}`)
  },

  logout() {
    this.user = null
    localStorage.removeItem('user')
  }
})