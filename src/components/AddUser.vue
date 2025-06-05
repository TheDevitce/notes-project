<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <div class="header">
        <img class="image" src="/src/assets/Featured icon.png" alt="Logo" />
        <h3>Добавление пользователя</h3>
      </div>

      <div class="form-container">
        <form @submit.prevent="handleSubmit">
          <label for="fullName">ФИО</label>
          <input type="text" id="fullName" v-model="fullName" placeholder="Введите ФИО" required />

          <label for="login">Логин</label>
          <input id="login" v-model="login" placeholder="Введите логин" required />

          <label for="password">Пароль</label>
          <input type="password" id="password" v-model="password" placeholder="Введите пароль" required />

          <label for="repeatPassword">Повторите пароль</label>
          <input type="password" id="repeatPassword" v-model="repeatPassword" placeholder="Повторите пароль" required />

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

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'add'])

const fullName = ref('')
const login = ref('')
const password = ref('')
const repeatPassword = ref('')

const handleSubmit = () => {
  if (password.value !== repeatPassword.value) {
    alert('Пароли не совпадают!')
    return
  }

  const newUser = {
    id: Date.now(),
    firstName: fullName.value.split(' ')[0],
    lastName: fullName.value.split(' ').slice(1).join(' ') || '',
    fio: fullName.value,
    username: login.value,
    password: password.value,
    role: 'user',
    active: true,
    noteCount: Math.floor(Math.random() * 20)
  }

  emit('add', newUser)
  closeModal()
}

const closeModal = () => {
  fullName.value = ''
  login.value = ''
  password.value = ''
  repeatPassword.value = ''
  emit('close')
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