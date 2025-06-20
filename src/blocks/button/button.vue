<template>
  <button :type="type" :class="buttonClass" :disabled="disabled || loading" @click="handleClick">
    <slot v-if="!loading">{{ label }}</slot>
    <span v-else>Загрузка...</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: 'Кнопка'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  btnType: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'dark'].includes(value)
  },
  type: {
    type: String,
    default: 'button',
    validator: value => ['button', 'submit', 'reset'].includes(value)
  }
})

const emit = defineEmits(['click'])

const buttonClass = computed(() => ({
  button: true,
  'button_disabled': props.disabled || props.loading,
  'button_primary': props.btnType === 'primary',
  'button_secondary': props.btnType === 'secondary',
  'button_dark': props.btnType === 'dark'
}))

const handleClick = () => {
  if (!props.disabled && !props.loading) {
    emit('click')
  }
}
</script>

<style lang="scss" scoped>
.button {
  --color-primary: #005FF9;
  --color-primary-hover: #0040a8;
  --color-secondary: #BA0117;
  --color-secondary-hover: #900112;
  --color-dark: #181819;
  --color-dark-hover: #0f0f0f;
  --text-color: #ffffff;

  font-family: inherit;
  color: var(--text-color);
  background-color: var(--color-primary);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 12px 24px;
  transition: all 0.3s ease;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;

  &:hover {
    background-color: var(--color-primary-hover);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &_primary {
    background-color: var(--color-primary);

    &:hover {
      background-color: var(--color-primary-hover);
    }
  }

  &_secondary {
    background-color: var(--color-secondary);

    &:hover {
      background-color: var(--color-secondary-hover);
    }
  }

  &_dark {
    background-color: var(--color-dark);

    &:hover {
      background-color: var(--color-dark-hover);
    }
  }

  &_disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}
</style>