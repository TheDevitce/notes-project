<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class="header">
        <h3>Новая заметка</h3>
      </div>
      <div class="form-container">
        <form @submit.prevent="handleSubmit">
          <label for="title">Заголовок</label>
          <input id="title" v-model="title" placeholder="Введите заголовок" required />
          <label for="content">Текст</label>
          <textarea id="content" v-model="content" placeholder="Введите текст заметки" rows="5" required></textarea>
          <div class="buttons">
            <button type="button" @click="closeModal">Отмена</button>
            <button type="submit" class="primary">Добавить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuthToken } from '@/auth'

const emit = defineEmits(['close', 'add'])
const title = ref('')
const content = ref('')

const closeModal = () => emit('close')

const handleSubmit = () => {
  if (!title.value.trim() || !content.value.trim()) return

  const newPost = { title: title.value, body: content.value }
  const token = getAuthToken()

  console.log('Отправка данных:', newPost)
  console.log('Токен:', token || 'Токен не найден')

  emit('add', newPost)
  closeModal()
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
  z-index: 999;
}

.modal {
  background-color: #2a2a2a;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  width: 450px;
  color: white;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

h3 {
  margin: 0;
  font-size: 1.5rem;
  text-align: center;
}

.form-container {
  width: 100%;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-align: left;
}

input,
textarea {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
  box-sizing: border-box;
  background-color: #1e1e1e;
  color: white;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%;
}

button {
  padding: 0.8rem 1.5rem;
  width: 200px;
  font-size: 0.95rem;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="button"] {
  background-color: #181819;
  color: white;
}

.button-primary {
  background-color: #007bff;
  color: white;
}

.button-primary:hover {
  background-color: #0056b3;
}
</style>