<template>
  <button :class="['action-button', `action-button--${variant}`]" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'danger', 'primary'].includes(value)
  }
})

defineEmits(['click'])
</script>

<style lang="scss" scoped>
.action-button {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  border: none;
  border-radius: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: transparent;

  &--default {
    color: #ffffff;

    &:hover {
      background-color: #444;
    }
  }

  &--danger {
    color: #ff5656;

    &:hover {
      background-color: #444;
      color: rgb(255, 45, 45);
    }
  }

  &--primary {
    color: #007bff;

    &:hover {
      background-color: rgba(0, 123, 255, 0.1);
    }
  }
}
</style>