<template>
  <div class="login-container">
    <div class="login-form">
      <div class="logo">
        <img src="/src/assets/Featured icon.png" alt="Логотип">
      </div>
      <h2 class="title">Добро пожаловать</h2>
      <p class="subtitle">Введите ваш логин и пароль</p>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username" class="form-label">Логин</label>
          <input type="text" id="username" v-model="form.username" class="form-input" placeholder="yourLogin"
            required />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Пароль</label>
          <input type="password" id="password" v-model="form.password" class="form-input" placeholder="********"
            required />
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>

        <button type="submit" class="form-button" :disabled="loading">
          {{ loading ? 'Загрузка...' : 'Войти' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api' 

const router = useRouter()

const form = ref({
  username: '',
  password: ''
})

const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true;
  error.value = '';

  try {
    const credentials = {
      username: form.value.username,
      password: form.value.password
    };

    const response = await api.post('/auth/login', credentials);

    const userResponse = await api.get(`/users/${response.data.id}`);

    const determineRole = (user) => {
  if (user.role) return user.role;
  return ['admin', 'administrator'].includes(user.username.toLowerCase()) ? 'admin' : 'user';
};
    const userData = {
      id: userResponse.data.id,
      username: userResponse.data.username,
      email: userResponse.data.email,
      firstName: userResponse.data.firstName,
      lastName: userResponse.data.lastName,
      token: response.data.accessToken || 'no-token',
      role: determineRole(userResponse.data)
    };

    localStorage.setItem('auth', JSON.stringify(userData));

    router.push(userData.role === 'admin' ? '/Users' : '/Notes');

  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Ошибка входа';
    console.error('Login error:', err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background: #181819;
}

.error-message {
  color: #c0c0c0;
  margin-bottom: 1rem;
}

.login-form {
  background: #2A2A2B;
  padding: 2.5rem;
  border-radius: 10px;
  width: 400px;
  color: white;
  text-align: center;
  box-sizing: border-box;
}

.login-form * {
  box-sizing: border-box;
}

.logo {
  text-align: center;
}

.logo img {
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 1rem;
  color: #fff;
  text-align: left;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 6px;
  outline: none;
  margin-bottom: 1.5rem;
}

.form-button {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #0056b3;
}
</style>