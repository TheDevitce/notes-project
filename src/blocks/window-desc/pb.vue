<template>
  <div class="title-with-button">
    <h3 :class="['title-with-button__title', sizeClass]">
      <slot>{{ text }}</slot>
    </h3>
    <Button :btnType="buttonType" @click="$emit('button-click')" class="title-with-button__button">
      <slot name="button-text">{{ buttonText }}</slot>
    </Button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Button from '@/blocks/button/button.vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  buttonText: {
    type: String,
    default: 'Кнопка'
  },
  size: {
    type: String,
    default: 'large',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  buttonType: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'dark'].includes(value)
  }
})

defineEmits(['button-click'])

const sizeClass = computed(() => `title-with-button__title--${props.size}`)
</script>

<style lang="scss" scoped>
.title-with-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  &__title {
    margin: 0;
    color: #ffffff;
    font-weight: 500;

    &--small {
      font-size: 1.2rem;
    }

    &--medium {
      font-size: 1.5rem;
    }

    &--large {
      font-size: 1.8rem;
    }
  }

  &__button {
    flex-shrink: 0;
  }
}
</style>