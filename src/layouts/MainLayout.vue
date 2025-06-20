<script setup>
import Header from '@/components/Header.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="main-layout">
    <Header />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding: 20px;
}
</style>