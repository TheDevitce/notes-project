<template>
  <ModalBase class="auth-modal">
    <div class="auth-modal__content">
      <div class="auth-form__logo">
        <SvgLogo name="logo" color="#000" size="30" />
      </div>

      <AuthTitle 
        title="Добро пожаловать" 
        subtitle="Введите ваш логин и пароль" 
        class="auth-form__title"
      />
      
      <form @submit.prevent="handleLogin" class="auth-form">
        <InputComponent 
          id="username" 
          label="Логин" 
          v-model="form.username" 
          placeholder="yourLogin" 
          required
          class="auth-form__input"
        />
        <InputComponent 
          id="password" 
          label="Пароль" 
          type="password" 
          v-model="form.password" 
          placeholder="********"
          required 
          class="auth-form__input"
        />

        <div class="auth-form__button-wrapper">
          <ButtonComponent 
            type="submit" 
            btnType="primary" 
            class="auth-form__button" 
            :disabled="loading"
          >
            Войти
          </ButtonComponent>
        </div>
      </form>
    </div>
  </ModalBase>
</template>

<script setup>
import { ref } from 'vue'
import ModalBase from '@/blocks/modal/modal.vue'
import { useRouter } from 'vue-router'
import api from '@/api'
import AuthTitle from '@/blocks/text-elements/auth-title.vue'
import ButtonComponent from '@/blocks/button/button.vue'
import InputComponent from '@/blocks/input/input.vue'
import SvgLogo from '@/components/SvgComponents/SvgLogo.vue'
import { useAuthStore } from '@/stores/userData'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  username: '',
  password: ''
})

const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const credentials = {
      username: form.value.username,
      password: form.value.password
    }

    const response = await api.post('/auth/login', credentials)
    const userResponse = await api.get(`/users/${response.data.id}`)

    const determineRole = (user) => {
      if (user.role) return user.role
      return ['admin', 'administrator'].includes(user.username.toLowerCase()) ? 'admin' : 'user'
    }

    const userData = {
      id: userResponse.data.id,
      username: userResponse.data.username,
      email: userResponse.data.email,
      firstName: userResponse.data.firstName,
      lastName: userResponse.data.lastName,
      token: response.data.accessToken || 'no-token',
      role: determineRole(userResponse.data)
    }

    authStore.setUserData(userData)

    router.push(userData.role === 'admin' ? '/Users' : '/Notes')

  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Ошибка входа'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.auth-modal {
  width: 408px;
  height: 424px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.auth-form {
  width: 100%;
  max-width: 360px; 
  display: flex;
  flex-direction: column;
  align-items: center; 

  &__logo {
    margin-bottom: 15px;
  }

  &__title {
    margin-bottom: 24px; 
    text-align: center; 
  }

  &__input {
    width: 100%;
    height: 44px;
    margin-bottom: 40px;
    

  }

  &__button-wrapper {
    width: 100%;
  }

  &__button {
    width: 100%;
    height: 44px;
  }
}
</style>