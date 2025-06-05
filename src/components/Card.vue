<template>
  <div class="note-card">
    <h3 class="note-title">{{ post.title }}</h3>
    <div class="note-content-wrapper">
      <p v-if="!isEditing" class="note-content" @click="startEditing">
        {{ post.body }}
      </p>
      <textarea v-else v-model="editedBody" class="edit-textarea" placeholder="Введите текст..."
                @blur="saveEdit" @keyup.enter="saveEdit" autofocus></textarea>
    </div>
    <div class="actions">
      <button @click="showDeleteModal = true" class="action-btn-del">Удалить</button>
      <button @click="startEditing" class="action-btn">Изменить</button>
    </div>
   <DeleteConfirmModal
  :showModal="showDeleteModal"
  itemType="заметку"
  :itemName="post.title"
  @close="showDeleteModal = false"
  @confirm="$emit('delete', post.id)"
/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DeleteConfirmModal from './DeleteConfirmModal.vue'

const props = defineProps({ post: Object })
const emit = defineEmits(['delete', 'update'])

const isEditing = ref(false)
const editedBody = ref(props.post.body)
const showDeleteModal = ref(false)

const startEditing = () => {
  isEditing.value = true
  editedBody.value = props.post.body
}

const saveEdit = () => {
  isEditing.value = false
  emit('update', { ...props.post, body: editedBody.value })
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