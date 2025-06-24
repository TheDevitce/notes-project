<template>
  <div class="modal-overlay" @click.self="handleOverlayClick">
    <CardBase class="modal-add-note">
      <header class="modal-add-note__header">
        <SvgLogo />
        <Title title="Новая заметка" />
      </header>

      <form class="modal-add-note__form" @submit.prevent="handleSubmit">
        <div class="form-inputs">
          <Input id="note-title" label="Заголовок" v-model="formData.title" required />
          <Input id="note-content" label="Текст" v-model="formData.content" type="textarea" required />
        </div>

        <div class="modal-add-note__actions">
          <Button btn-type="dark" @click="closeModal">Отмена</Button>
          <Button btn-type="primary" type="submit">Добавить</Button>
        </div>
      </form>
    </CardBase>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CardBase from '@/blocks/modal/modal.vue'
import Title from '@/blocks/text-elements/title.vue'
import Input from '@/blocks/input/input.vue'
import Button from '@/blocks/button/button.vue'
import SvgLogo from '@/components/SvgComponents/SvgLogo.vue'

const emit = defineEmits(['close', 'add'])

const formData = ref({
  title: '',
  content: ''
})

const closeModal = () => {
  emit('close')
}

const handleSubmit = () => {
  if (!formData.value.title.trim() || !formData.value.content.trim()) return

  emit('add', {
    title: formData.value.title,
    body: formData.value.content
  })

  closeModal()
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
  z-index: 999;
}

.modal-add-note {
  width: 408px; 
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
    width: 100%;
  }

  &__form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .form-inputs {
    width: 360px; 
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__actions {
    width: 360px; 
    display: flex;
    justify-content: space-between;
    gap: 12px; 
    margin-top: 1rem;
    
    button {
      width: 174px; 
    }
  }
}
</style>