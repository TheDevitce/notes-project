<template>
  <h3 class="note-title">
    {{ title }}
  </h3>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.note-title {
  font-size: 1.2rem;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
  word-break: break-word;
}
</style>