<template>
  <div class="header">
    <div class="logo">NOTY</div>

    <nav v-if="user && user.role === 'admin'" class="nav-wrapper">
      <ul class="navul">
        <li>Заметки пользователей</li>
        <li @click="navigateTo('/Users')">Пользователи</li>
      </ul>
    </nav>

    <div class="user-actions">
      <UserAvatarWithName v-if="user" 
        :first-name="user.firstName" 
        :last-name="user.lastName" 
        :email="user.email" 
      />

      <button v-if="user" class="logout-btn" title="Выйти" @click="handleLogout">
        <SvgIcon name="logout" color="#000" size="30" />
      </button>
    </div>
  </div>

  <div class="create-line"></div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import UserAvatarWithName from '@/blocks/other/UserAvatarWithName.vue'
import SvgIcon from '@/components/SvgComponents/SvgLogOut.vue'
import { useAuthStore } from '@/stores/userData'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const navigateTo = (path) => {
  router.push(path)
}

const handleLogout = () => {
  const isConfirmed = confirm('Вы действительно хотите выйти?')
  if (isConfirmed) {
    authStore.clearUser()
    router.push('/')
  }
}
</script>


<style scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  font-family: sans-serif;
  color: #fff;
}

.nav-wrapper {
  margin-left: 20px;
  flex: 1;
}

.navul {
  display: flex;
  list-style-type: none;
  gap: 20px;
  cursor: pointer;
  align-items: center;
  padding: 0;
  margin: 0;
}

.navul li {
  color: white;
  font-size: 1rem;
  transition: color 0.3s ease;
  cursor: pointer;
}

.navul li:hover {
  color: #1abc9c;
}

.logo {
  font-weight: bold;
  font-size: 2.5rem;
  margin-right: 750px;
}

.user-actions {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  text-align: right;
}

.name {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
}

.mail {
  font-size: 0.85rem;
  color: #ffffff;
}

.logout-btn {
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.logout-btn:hover {
  transform: scale(1.1);
}

.logout-btn:active {
  transform: scale(0.95);
}

.logout-icon {
  width: 40px;
  height: 40px;
  transition: filter 0.3s ease;
  display: block;
}

.logout-btn:hover .logout-icon {
  filter: brightness(0.8);
}

.create-line {
  border-top: 0.5px solid #c0c0c02d;
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 9%;
  z-index: 10;
}
</style>