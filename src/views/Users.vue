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
      <UsersCard v-for="(user, index) in filteredUsers" :key="user.id" :user="user"
        :is-last="index === filteredUsers.length - 1" @delete="deleteUser" @update="updateUser" />
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import UsersCard from '../components/UsersCard.vue'
import AddUser from '../components/AddUser.vue'

const users = ref([])
const notes = ref([])
const loading = ref(true)
const isModalOpen = ref(false)

const loadUsers = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/c/9267-1423-433b-9135')
    if (response.data?.response?.users) {
      users.value = response.data.response.users.map(user => ({
        ...user,
        noteCount: 0
      }))
    } else {
      users.value = []
    }
  } catch (err) {
    console.error('Ошибка при загрузке пользователей:', err)
    users.value = []
  }
}

const loadNotes = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/c/2396-1f92-4cbf-9cd3')
    if (response.data?.response?.userNotes) {
      notes.value = response.data.response.userNotes
    } else {
      notes.value = []
    }
  } catch (err) {
    console.error('Ошибка при загрузке заметок:', err)
    notes.value = []
  }
}

const mergeUserDataWithNotes = () => {
  const noteCountMap = {}

  notes.value.forEach(note => {
    noteCountMap[note.userId] = (noteCountMap[note.userId] || 0) + 1
  })

  users.value = users.value.map(user => ({
    ...user,
    noteCount: noteCountMap[user.id] || 0
  }))
}

const loadData = async () => {
  loading.value = true
  try {
    await Promise.all([loadUsers(), loadNotes()])
    mergeUserDataWithNotes()
  } finally {
    loading.value = false
  }
}

const filteredUsers = computed(() => {
  return users.value
})

const deleteUser = (id) => {
  users.value = users.value.filter(user => user.id !== id)
}

const updateUser = (updatedUser) => {
  const index = users.value.findIndex(user => user.id === updatedUser.id)
  if (index !== -1) {
    users.value[index] = updatedUser
    alert('Изменения успешно сохранены.')
  }
}

const openAddUserModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleAddUser = (newUser) => {
  users.value.push(newUser)
  closeModal()
}

onMounted(async () => {
  await loadData()
})
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