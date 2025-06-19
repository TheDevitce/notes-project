<template>
  <button
    :class="buttonClass"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const buttonClass = computed(() => ({
  button: true,
  'button_disabled': props.disabled
}))
</script>

<style scoped src="./button.scss"></style>