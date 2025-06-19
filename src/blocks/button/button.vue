<template>
  <button :class="['button', { 'button_disabled': disabled }]" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped src="./button.scss"></style>