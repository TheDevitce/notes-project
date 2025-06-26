import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const setUserData = (userData) => {
    user.value = userData
  }

  const clearUser = () => {
    user.value = null
  }

  const isAdmin = computed(() => user.value?.role === 'admin')
  const isAuthenticated = computed(() => !!user.value)

  return {
    user,
    setUserData,
    clearUser,
    isAdmin,
    isAuthenticated
  }
})