<template>
  <div class="main-page">
    <AuthForm />
  </div>
</template>

<script setup>
import AuthForm from '@/blocks/auth-form/auth-form.vue';
</script>

<style scoped>
.main-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #181819;
}
</style>