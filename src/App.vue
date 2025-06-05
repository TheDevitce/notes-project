<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue'

const route = useRoute()
const router = useRouter()

const isAuthenticated = ref(false)

const checkAuth = () => {
  const auth = localStorage.getItem('auth')
  try {
    const parsedAuth = auth ? JSON.parse(auth) : null
    isAuthenticated.value = !!(parsedAuth && parsedAuth.username && parsedAuth.active !== false)
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
    <header v-if="isAuthenticated">
      <Header />
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>