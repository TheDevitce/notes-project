<template>
  <div class="note-card">
    <header class="note-card__header">
      <NoteTitle :title="post.title" />
    </header>

    <main class="note-card__content">
      <NoteContent :content="post.body" :is-editing="isEditing" @edit-start="startEditing" @edit-save="saveEdit" />
    </main>

    <footer class="note-card__footer">
      <div class="note-card__actions">
        <ActionButton variant="danger" @click="showDeleteModal = true">
          Удалить
        </ActionButton>
        <ActionButton @click="toggleEdit">
          {{ isEditing ? 'Сохранить' : 'Изменить' }}
        </ActionButton>
      </div>
    </footer>

    <DeleteConfirmModal :show-modal="showDeleteModal" item-type="заметку" :item-name="post.title"
      @close="showDeleteModal = false" @confirm="$emit('delete', post.id)" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DeleteConfirmModal from './DeleteConfirmModal.vue'
import NoteTitle from '@/blocks/text-elements/title.vue'
import NoteContent from '@/blocks/input/content.vue'
import ActionButton from '@/blocks/button/sbutton.vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete', 'update'])

const isEditing = ref(false)
const showDeleteModal = ref(false)

const startEditing = () => {
  isEditing.value = true
}

const saveEdit = (newContent) => {
  isEditing.value = false
  emit('update', { ...props.post, body: newContent })
}

const toggleEdit = () => {
  if (isEditing.value) {
    saveEdit(localContent.value)
  } else {
    startEditing()
  }
}
</script>

<style lang="scss" scoped>
.note-card {
  background-color: #2a2a2a;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  margin-bottom: 1.5rem;
  color: white;
  width: 300px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
}

.note-card__content {
  flex-grow: 1;
}

.note-card__footer {
  margin-top: auto;
}

.note-card__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>