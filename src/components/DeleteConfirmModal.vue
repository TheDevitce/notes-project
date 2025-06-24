<template>
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <CardBase class="modal-confirm">
      <header class="modal-confirm__header">
        <SvgLogo />
        <Title class="modal-confirm__title" :title="`Вы уверены, что хотите удалить ${itemType}?`" />
      </header>

      <div class="modal-confirm__actions">
        <Button btn-type="dark" class="modal-confirm__cancel" @click="closeModal">
          Отмена
        </Button>
        <Button btn-type="secondary" class="modal-confirm__delete" @click="confirmDelete">
          Удалить
        </Button>
      </div>
    </CardBase>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import CardBase from '@/blocks/modal/modal.vue'
import Title from '@/blocks/text-elements/title.vue'
import Button from '@/blocks/button/button.vue'
import SvgLogo from '@/components/SvgComponents/SvgLogo.vue'

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true
  },
  itemType: {
    type: String,
    required: true,
    validator: value => ['пользователя', 'заметку'].includes(value)
  },
  itemName: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'confirm'])

const closeModal = () => {
  emit('close')
}

const confirmDelete = () => {
  emit('confirm')
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-confirm {
  width: 480px; 
  padding: 32px;
  text-align: center;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
  }

  &__title {
    margin-top: 16px;
    font-size: 1.2rem;
  }

  &__content {
    width: 360px; 
    margin: 0 auto 32px auto;
  }

  &__item-name {
    font-weight: bold;
    font-size: 1.1rem;
    margin-top: 8px;
  }

  &__actions {
    width: 360px; 
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  &__cancel,
  &__delete {
    width: 174px; 
  }
}
</style>