<template>
  <div class="user-card" :class="{ 'last-user': isLast }">
    <div class="user-info">
      <div class="avatar">
        <span>{{ avatarText }}</span>
      </div>
      <div class="user-details">
        <h4 class="name">{{ fullName }}</h4>
        <p class="note-count">{{ user.noteCount }} заметок</p>
      </div>
    </div>

    <div class="statuses">
      <div class="status-label" :class="{ active: user.active, inactive: !user.active }">
        {{ user.active ? 'Активирован' : 'Деактивирован' }}
      </div>

      <div class="role-dropdown">
        <select v-model="user.role" @change="$emit('update:user', user)"
          :class="{ 'role-admin': user.role === 'admin', 'role-user': user.role === 'user' }">
          <option value="admin">Администратор</option>
          <option value="user">Пользователь</option>
        </select>
      </div>
    </div>

    <div class="actions">
      <tbutton class="action-btn edit" title="Редактировать" @click="$emit('update', user)" type="edit">
      </tbutton>
      <tbutton class="action-btn delete" title="Удалить" @click="showDeleteModal = true" type="delete">
      </tbutton>
    </div>

    <DeleteConfirmModal v-if="showDeleteModal" :showModal="showDeleteModal" itemType="пользователя" :itemName="fullName"
      @close="showDeleteModal = false" @confirm="
        $emit('update:user', { ...user, active: false });
      showDeleteModal = false;
      " />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import DeleteConfirmModal from '../components/DeleteConfirmModal.vue'
import tbutton from '@blocks/button/tbutton.vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      firstName: '',
      lastName: '',
      noteCount: 0,
      active: true,
      role: 'user'
    })
  },
  isLast: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['delete', 'update:user', 'update'])

const avatarText = computed(() => {
  return props.user.firstName?.charAt(0).toUpperCase() || '?'
})

const fullName = computed(() => {
  return `${props.user.firstName} ${props.user.lastName}`
})

const showDeleteModal = ref(false)
</script>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #343a40;
  padding: 1rem 1.5rem;
  color: white;
  position: relative;
}

.user-card:not(.last-user)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.5px;
  background-color: rgba(255, 255, 255, 0.1);
}

.last-user {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: white;
  color: #3498db;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.name {
  font-size: 1.2rem;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.note-count {
  position: absolute;
  left: 300px;
  font-size: 0.9rem;
  color: #ffffffcc;
}

.statuses {
  display: flex;
  gap: 1rem;
  margin-left: 2rem;
}

.status-label {
  padding: 0.3rem 0.8rem;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: bold;
  white-space: nowrap;
}

.status-label.active {
  background-color: rgba(0, 123, 255, 0.1);
  color: #007bff;
}

.status-label.inactive {
  background-color: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.role-dropdown {
  position: relative;
}

.role-dropdown select {
  appearance: none;
  background-color: #ffffff;
  padding: 0.3rem 2rem 0.3rem 0.8rem;
  border: none;
  border-radius: 16px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  font-weight: bold;
}

.role-dropdown select.role-admin {
  color: #007bff;
}

.role-dropdown select.role-user {
  color: #2ecc71;
}

.role-dropdown::after {
  content: '▾';
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
  font-size: 0.8rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.delete:hover {
  background-color: rgba(235, 76, 63, 0.1);
}

.edit:hover {
  background-color: rgba(241, 196, 15, 0.1);
}

.user-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  position: relative;
}
</style>