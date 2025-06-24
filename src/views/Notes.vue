<template>
  <div class="notes-container">
    <div class="notes-header">
      <TitleWithButton text="Ваши заметки" button-text="Новая заметка +" @button-click="openAddNoteModal" />
    </div>

    <AddNoteModal v-if="isModalOpen" @close="closeModal" @add="handleAddPost" />

    <div v-if="loading" class="status-message">Загрузка заметок...</div>
    <div v-else-if="filteredPosts.length === 0" class="status-message">У вас пока нет заметок.</div>
    <div v-else class="note-cards">
      <Card v-for="post in filteredPosts" :key="post.id" :post="post" @delete="deletePost" @update="updatePost" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/api'
import { getAuthToken } from '@/auth'
import Card from '../components/Card.vue'
import TitleWithButton from '@/blocks/window-desc/pb.vue'
import AddNoteModal from '../components/AddNoteModal.vue'

const posts = ref([])
const loading = ref(true)
const userId = ref(null)
const isModalOpen = ref(false)

onMounted(async () => {
  const authData = localStorage.getItem('auth')
  if (authData) {
    try {
      const user = JSON.parse(authData)
      userId.value = user.id
    } catch (e) {
      console.error('Ошибка парсинга:', e)
    }
  }
  await loadPosts()
})

const loadPosts = async () => {
  loading.value = true
  try {
    const authData = localStorage.getItem('auth')
    const user = authData ? JSON.parse(authData) : null
    if (!user || !user.id) throw new Error('Пользователь не авторизован')
    const response = await api.get(`/posts/user/${user.id}`)
    posts.value = response.data.posts || []
  } catch (err) {
    console.error('Ошибка загрузки:', err)
    posts.value = []
  } finally {
    loading.value = false
  }
}

const filteredPosts = computed(() => {
  return posts.value.filter(post => String(post.userId) === String(userId.value))
})

const deletePost = (postId) => {
  const token = getAuthToken()
  const postToDelete = posts.value.find(p => p.id === postId)

  if (!postToDelete) {
    console.warn('Пост не найден')
    return
  }

  posts.value = posts.value.filter(p => p.id !== postId)

  console.log('Пост удалён:', postToDelete)
  console.log('Токен:', token || 'Не найден')
}

const updatePost = (updatedPost) => {
  const token = getAuthToken()

  const index = posts.value.findIndex(p => p.id === updatedPost.id)

  if (index === -1) {
    console.warn('Пост не найден')
    return
  }

  posts.value[index] = { ...updatedPost }

  console.log('Пост обновлён:', updatedPost)
  console.log('Токен:', token || 'Не найден')
}

const openAddNoteModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleAddPost = async (newPost) => {
  try {
    const authData = localStorage.getItem('auth')
    const user = authData ? JSON.parse(authData) : null
    if (!user?.id) throw new Error('Пользователь не авторизован')
    const response = await api.post('/posts/add', {
      title: newPost.title,
      body: newPost.body,
      userId: user.id
    })
    posts.value.push(response.data)
    closeModal()
  } catch (err) {
    console.error('Ошибка при добавлении:', err)
    alert('Не удалось создать')
  }
}
</script>

<style scoped>
.notes-container {
  padding: 2rem;
  color: white;
}

.notes-header {
  margin-bottom: 1.5rem;
}

.note-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.status-message {
  text-align: center;
  color: #ccc;
  font-size: 20px;
  margin-top: 5rem;
}

:deep(.title-with-button) {
  gap: 200px !important;
}
</style>