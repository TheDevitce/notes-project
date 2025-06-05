<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class="header">
        <img class="image" src="/src/assets/Featured icon.png" alt="Logo" />
        <h3>Новая заметка</h3>
      </div>

      <div class="form-container">
        <form @submit.prevent="handleSubmit">
          <label for="title">Заголовок</label>
          <input type="text" id="title" v-model="title" placeholder="Введите заголовок" required />

          <label for="content">Текст</label>
          <input id="content" v-model="content" placeholder="Введите текст заметки" rows="5" required></input>

          <div class="buttons">
            <button type="button" @click="closeModal">Отмена</button>
            <button type="submit" class="primary" @click="handleSubmit">Добавить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close', 'add']);

const title = ref('');
const content = ref('');

const closeModal = () => {
  emit('close');
};

const handleSubmit = () => {
  if (title.value.trim() && content.value.trim()) {
    const authData = localStorage.getItem('auth');
    const user = authData ? JSON.parse(authData) : null;
    const userId = user?.id || 'unknown';

    const existingNotes = JSON.parse(localStorage.getItem('localNotes') || '[]');

    let maxId = 0;
    existingNotes.forEach(note => {
      const numericId = parseInt(note.id);
      if (!isNaN(numericId) && numericId > maxId) {
        maxId = numericId;
      }
    });

    const newNote = {
      id: String(maxId + 1),
      userId: String(userId),
      name: title.value.trim(),
      description: content.value.trim()
    };

    const updatedNotes = [...existingNotes, newNote];
    localStorage.setItem('localNotes', JSON.stringify(updatedNotes));

    emit('add', newNote);
    closeModal();

    title.value = '';
    content.value = '';
  }
};
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
  width: 350px;
  color: white;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.image {
  width: 50px;
  height: 50px;
  margin-bottom: 0.5rem;
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

input {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
  box-sizing: border-box;
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

button.primary {
  background-color: #007bff;
  color: white;
}

button.primary:hover {
  background-color: #0056b3;
}
</style>