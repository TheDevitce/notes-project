<template>
  <button
    :class="buttonClass"
    :disabled="disabled"
  >
  <!-- проверка на loading -->
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
  // loading
  // btnType - default
})

const buttonClass = computed(() => ([
  "button",
  {
  'button_disabled': props.disabled,
  // "button_pri": props.btnType === ""
}
]))
</script>

<style scoped src="./button.scss"></style>