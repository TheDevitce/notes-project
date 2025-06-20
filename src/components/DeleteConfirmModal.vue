<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <SvgIcon name="logo" color="#000" size="30" />
      </div>
      <div class="modal-content">
        <p>Вы уверены, что хотите удалить {{ itemType }} "<strong>{{ itemName }}</strong>"?</p>
      </div>

      <div class="modal-actions">
        <button class="btn cancel" @click="closeModal">Отмена</button>
        <button class="btn delete" @click="confirmDelete">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true
  },
  itemType: {
    type: String,
    required: true,
    validator: value => ['заметку', 'пользователя'].includes(value)
  },
  itemName: {
    type: String,
    required: true
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

<style scoped>
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

.modal {
  background-color: #1a1a1a;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: white;
  max-width: 400px;
  width: 100%;
}

.modal-header {
  margin-bottom: 1.5rem;
}

.logo {
  width: 60px;
  height: 60px;
  filter: invert(1);
}

.modal-content {
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel {
  background-color: #333;
  color: white;
}

.delete {
  background-color: #e74c3c;
  color: white;
}

.delete:hover {
  background-color: #c0392b;
}

.cancel:hover {
  background-color: #555;
}
</style>