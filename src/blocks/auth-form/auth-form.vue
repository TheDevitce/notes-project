<template>
  <div class="auth-form">
    <div class="auth-form__container">
      <div class="auth-form__logo">
        <SvgIcon name="logo" color="#000" size="30" />
      </div>
      <h2 class="auth-form__title">Добро пожаловать</h2>
      <p class="auth-form__subtitle">Введите ваш логин и пароль</p>

      <form @submit.prevent="handleLogin">
        <InputComponent id="username" label="Логин"  v-model="form.username" placeholder="yourLogin"  required class="auth-form__input" />
        <InputComponent id="password" label="Пароль"  type="password" v-model="form.password" placeholder="********" required class="auth-form__input" />

        <div v-if="error" class="auth-form__error">{{ error }}</div>

        <ButtonComponent class="auth-form__button" :disabled="loading">
          {{ loading ? 'Загрузка...' : 'Войти' }}
        </ButtonComponent>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'
import ButtonComponent from '@/blocks/button/button.vue'
import InputComponent from '@/blocks/input/input.vue'
import SvgIcon from '@/components/SvgIcon.vue'

const router = useRouter()

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

    localStorage.setItem('auth', JSON.stringify(userData))

    router.push(userData.role === 'admin' ? '/Users' : '/Notes')

  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Ошибка входа'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style src="./auth-form.scss">
:deep(.input__field) {
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
}
</style>