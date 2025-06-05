<template>
  <div class="users-container">
    <div class="users-header">
      <h3 class="users-title">Список пользователей</h3>
      <button class="add-user-btn" @click="openAddUserModal">Новый пользователь +</button>
    </div>

    <div class="user-table-header">
      <div class="header-cell">ФИО пользователя</div>
      <div class="header-cell">Кол-во заметок</div>
      <div class="header-cell">Статус</div>
      <div class="header-cell role">Роль</div>
      <div class="header-cell actions">Действия</div>
    </div>

    <AddUser :visible="isModalOpen" @close="closeModal" @add="handleAddUser" />

    <div v-if="loading" class="status-message">
      Загрузка пользователей...
    </div>

    <div v-else-if="filteredUsers.length === 0" class="status-message">
      Пользователей пока нет.
    </div>

    <div v-else class="user-table">
      <UsersCard
  v-for="(user, index) in filteredUsers"
  :key="user.id"
  :user="user"
  :is-last="index === filteredUsers.length - 1"
  @update:user="updateUser"
/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UsersCard from '../components/UsersCard.vue'
import AddUser from '../components/AddUser.vue'
import { getAuthToken } from '@/auth'
import api from '../api' 


const users = ref([])
const filteredUsers = ref([])
const loading = ref(true)
const error = ref(null)
const isModalOpen = ref(false)


const fetchUsers = async () => {
  try {
    const response = await api.get('/users')
    
    users.value = response.data.users.map(user => ({
      ...user,
      active: user.active ?? true,
      noteCount: Math.floor(Math.random() * 20)
    }))

    filteredUsers.value = users.value.filter(u => u.role !== 'moderator')

  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
onMounted(fetchUsers)

const openAddUserModal = () => {
  isModalOpen.value = true
}
const closeModal = () => {
  isModalOpen.value = false
}

const handleAddUser = (newUser) => {
  const token = getAuthToken()
  console.log('Новый пользователь:', newUser)
  console.log('Токен:', token || 'Не найден')
  filteredUsers.value.push(newUser)
  closeModal()
}

const deleteUser = (userId) => {
  const index = filteredUsers.value.findIndex(u => u.id === userId)
  if (index !== -1) {
    const token = getAuthToken()
    console.log('Удаляем пользователя:', filteredUsers.value[index])
    console.log('Токен:', token || 'Не найден')
    filteredUsers.value.splice(index, 1)
  }
}

const updateUser = (updatedUser) => {
  const index = filteredUsers.value.findIndex(u => u.id === updatedUser.id)
  if (index !== -1) {
    const token = getAuthToken()
    console.log('Обновляем пользователя:', updatedUser)
    console.log('Токен:', token || 'Не найден')
    filteredUsers.value[index] = updatedUser
  }
}
</script>

<style scoped>
.users-container {
  padding: 2rem;
  color: white;
}

.users-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.users-title {
  font-size: 1.8rem;
  color: #ffffff;
  margin: 0;
}

.add-user-btn {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  color: #fff;
  background-color: #1d4add;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-user-btn:hover {
  background-color: #218838;
}

.user-table {
  display: flex;
  flex-direction: column;
}

.status-message {
  text-align: center;
  color: #ccc;
  font-size: 20px;
  margin-top: 5rem;
}

.user-table-header {
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  gap: 1rem;
  padding: 1rem 0;
  background-color: #343a40;
  font-weight: bold;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.header-checkbox {
  width: 24px;
  height: 24px;
  appearance: none;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.header-checkbox:checked {
  background-color: #1d4add;
  border-color: #1d4add;
}

.header-checkbox:checked::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background-image: url("/src/assets/_Checkbox base.png");
  background-size: cover;
  opacity: 1;
}

.header-cell {
  text-align: left;
  padding-left: 1rem;
}

.actions {
  justify-self: end;
  padding-right: 3rem;
}
</style>