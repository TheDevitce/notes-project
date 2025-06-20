<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = ref(false)

const checkAuth = () => {
  const auth = localStorage.getItem('auth')
  try {
    const parsedAuth = auth ? JSON.parse(auth) : null
    isAuthenticated.value = !!(parsedAuth && parsedAuth.token)
  } catch (e) {
    isAuthenticated.value = false
  }
}

onMounted(() => {
  checkAuth()
})

router.afterEach(() => {
  checkAuth()
})
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style scoped></style>