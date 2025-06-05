<template>
  <div class="note-card">
    <h3 class="note-title">{{ note.name }}</h3>

    <div class="note-content-wrapper">
      <p v-if="!isEditing" class="note-content" @click="startEditing">
        {{ note.description }}
      </p>

      <textarea v-else v-model="editedDescription" class="edit-textarea" placeholder="Введите описание..."
        @blur="saveEdit" @keyup.enter="saveEdit" autofocus></textarea>
    </div>

    <div class="actions">
      <button @click="showDeleteModal = true" class="action-btn-del">Удалить</button>
      <button @click="startEditing" class="action-btn">Изменить</button>
    </div>

    <DeleteConfirmModal v-if="showDeleteModal" :showModal="showDeleteModal" itemType="заметку" :itemName="note.name"
      @close="showDeleteModal = false" @confirm="$emit('delete', note.id)" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DeleteConfirmModal from '@/components/DeleteConfirmModal.vue'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete', 'update'])

const isEditing = ref(false)
const editedDescription = ref(props.note.description)
const showDeleteModal = ref(false)

const startEditing = () => {
  isEditing.value = true
}

const saveEdit = () => {
  const updatedNote = { ...props.note, description: editedDescription.value }
  emit('update', updatedNote)
  isEditing.value = false
}
</script>

<style scoped>
.note-card {
  background-color: #2a2a2a;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  margin-bottom: 1.5rem;
  color: white;
  width: 250px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.note-title {
  font-size: 1.2rem;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
}

.note-content {
  font-size: 0.9rem;
  color: #cccccc;
  line-height: 1.5;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  cursor: pointer;
}

.actions {
  display: flex;
  align-items: center;
  margin-top: auto;
}

.action-btn {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  color: #ffffff;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-textarea {
  width: 100%;
  height: 100px;
  padding: 0.5rem;
  font-size: 0.9rem;
  resize: none;
  border-radius: 4px;
  border: 1px solid #777;
  outline: none;
  background-color: #1e1e1e;
  color: #fff;
  box-sizing: border-box;
}

.action-btn-del {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  color: #ff5656;
  margin-right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-btn-del:hover {
  background-color: #444;
  color: rgb(255, 45, 45);
}

.action-btn:hover {
  background-color: #444;
}
</style>