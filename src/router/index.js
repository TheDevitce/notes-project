import { createRouter, createWebHashHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue' // Добавлен главный лейаут
import Notes from '../views/Notes.vue'
import AllNotes from '../views/AllNotes.vue'
import Users from '../views/Users.vue'
import { isAuthenticated, hasRole, getAuthUser } from '../auth' 

const routes = [
  {
    path: '/',
    name: 'Авторизация',
    component: AuthLayout,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'Notes',
        name: 'Notes',
        component: Notes,
        meta: { roles: ['user'] }
      },
      {
        path: 'Users',
        name: 'Users',
        component: Users,
        meta: { roles: ['admin'] }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!isAuthenticated()) {
      return next('/')
    }
    
    if (to.meta.roles) {
      const user = getAuthUser()
      const hasRequiredRole = to.meta.roles.some(role => hasRole(role))
      if (!hasRequiredRole) {
        return next(user.role === 'admin' ? '/AllNotes' : '/Notes')
      }
    }
  }
  
  next()
})

export default router