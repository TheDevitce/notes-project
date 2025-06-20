<template>
  <h2 class="auth-form__title">{{ title }}</h2>
  <p class="auth-form__subtitle">{{ subtitle }}</p>
</template>


<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: null
  }
})
</script>

<style>
.auth-title {
  &__title {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: white;
    text-align: center;
  }
}
</style>