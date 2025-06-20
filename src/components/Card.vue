<template>
  <div class="note-card">
    <NoteTitle :title="post.title" />

    <NoteContent :content="post.body" :is-editing="isEditing" @edit-start="startEditing" @edit-save="saveEdit" />

    <div class="note-card__actions">
      <ActionButton variant="danger" @click="showDeleteModal = true">
        Удалить
      </ActionButton>
      <ActionButton @click="startEditing">
        Изменить
      </ActionButton>
    </div>

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
  justify-content: flex-start;
  gap: 1rem;
}

.note-card__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
}
</style>