<template>
  <div v-if="visible" class="modal-overlay" @click.self="closeModal">
    <CardBase class="modal-add-user">
      <header class="modal-add-user__header">
        <SvgLogo />
        <Title class="modal-add-user__title" title="Добавление пользователя" />
      </header>

      <form class="modal-add-user__form" @submit.prevent="handleSubmit">
        <div class="modal-add-user__content">
          <div class="modal-add-user__inputs">
            <Input id="fullName" label="Имя Фамилия" v-model="fullName" placeholder="Введите ФИО" required />

            <Input id="login" label="Логин" v-model="login" placeholder="Введите логин" required />

            <Input id="password" label="Пароль" type="password" v-model="password" placeholder="Введите пароль"
              required />

            <Input id="repeatPassword" label="Повторите пароль" type="password" v-model="repeatPassword"
              placeholder="Повторите пароль" required />
          </div>

          <div class="modal-add-user__actions">
            <Button btn-type="dark" @click="closeModal">
              Отмена
            </Button>
            <Button btn-type="primary" type="submit">
              Добавить
            </Button>
          </div>
        </div>
      </form>
    </CardBase>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CardBase from '@/blocks/modal/modal.vue'
import Title from '@/blocks/text-elements/title.vue'
import Input from '@/blocks/input/input.vue'
import Button from '@/blocks/button/button.vue'
import SvgLogo from '@/components/SvgComponents/SvgLogo.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'add'])

const fullName = ref('')
const login = ref('')
const password = ref('')
const repeatPassword = ref('')

const handleSubmit = () => {
  if (password.value !== repeatPassword.value) {
    alert('Пароли не совпадают!')
    return
  }

  const newUser = {
    id: Date.now(),
    firstName: fullName.value.split(' ')[0],
    lastName: fullName.value.split(' ').slice(1).join(' ') || '',
    fio: fullName.value,
    username: login.value,
    password: password.value,
    role: 'user',
    active: true,
    noteCount: Math.floor(Math.random() * 20)
  }

  emit('add', newUser)
  closeModal()
}

const closeModal = () => {
  fullName.value = ''
  login.value = ''
  password.value = ''
  repeatPassword.value = ''
  emit('close')
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-add-user {
  width: 408px;
  min-height: 568px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
    width: 100%;
  }

  &__title {
    margin-top: 16px;
  }

  &__form {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__content {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__inputs {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__actions {
    width: 100%;
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }

  .button {
    flex: 1; 
  }
}
</style>
