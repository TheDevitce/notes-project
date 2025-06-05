<template>
    <div class="notes-container">
        <div class="notes-header">
            <h3 class="notes-title">Ваши заметки</h3>
            <button class="add-note-btn" @click="openAddNoteModal">Новая заметка +</button>
        </div>

        <AddNoteModal v-if="isModalOpen" @close="closeModal" @add="handleAddNote" />

        <div v-if="loading" class="status-message">Загрузка заметок...</div>
        <div v-else-if="filteredNotes.length === 0" class="status-message">У вас пока нет заметок.</div>

        <div v-else class="note-cards">
            <Card v-for="note in filteredNotes" :key="note.id" :note="{ ...note }" @delete="deleteNote"
                @update="updateNote" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Card from '../components/Card.vue'
import AddNoteModal from '../components/AddNoteModal.vue'

const notes = ref([])
const loading = ref(true)
const userId = ref(null)
const isModalOpen = ref(false)

onMounted(async () => {
    const authData = localStorage.getItem('auth')
    if (authData) {
        try {
            const user = JSON.parse(authData)
            if (user && typeof user === 'object') {
                userId.value = user.id
            }
        } catch (e) {
            console.error('Ошибка парсинга:', e)
        }
    }

    await loadNotes()
})

const loadNotes = async () => {
    try {
        const response = await axios.get('https://dummyjson.com/c/a2f5-9d7d-421f-ac7f')
        notes.value = response.data.response?.userNotes || []
    } catch (err) {
        console.error('Ошибка загрузки заметок:', err)
        notes.value = JSON.parse(localStorage.getItem('localNotes') || '[]')
    } finally {
        loading.value = false
    }
}

const filteredNotes = computed(() => {
    if (!userId.value) return []
    return notes.value.filter(note => note.userId === String(userId.value))
})

const deleteNote = id => {
    notes.value = notes.value.filter(note => note.id !== id)
}

const updateNote = updatedNote => {
    const index = notes.value.findIndex(n => n.id === updatedNote.id)
    if (index !== -1) {
        notes.value = [
            ...notes.value.slice(0, index),
            { ...updatedNote },
            ...notes.value.slice(index + 1)
        ]
    }
}

const openAddNoteModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

const handleAddNote = newNote => {
    notes.value.push(newNote)
}
</script>

<style scoped>
.notes-container {
    padding: 2rem;
    color: white;
}

.notes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.notes-title {
    font-size: 1.8rem;
    color: #ffffff;
    margin: 0;
}

.add-note-btn {
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.add-note-btn:hover {
    background-color: #0056b3;
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
</style>