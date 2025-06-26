import { createRouter, createWebHashHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import Notes from '../views/Notes.vue'
import AllNotes from '../views/AllNotes.vue'
import Users from '../views/Users.vue'

import { isAuthenticated, hasRole } from '../auth'
import { useAuthStore } from '@/stores/userData'

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
      const userRole = useAuthStore().user?.role
      const allowedRoles = to.meta.roles

      const isAllowed = allowedRoles.some(role => hasRole(role))
      if (!isAllowed) {
        return next(userRole === 'admin' ? '/Users' : '/Notes')
      }
    }
  }

})
export default router