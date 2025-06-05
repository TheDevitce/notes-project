import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import Notes from '../views/Notes.vue'
import AllNotes from '../views/AllNotes.vue'
import Users from '../views/Users.vue'
import { isAuthenticated, hasRole, getAuthUser } from '../auth' 

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage
  },
  {
    path: '/Notes',
    name: 'Notes',
    component: Notes,
    meta: { requiresAuth: true, roles: ['user'] }
  },
  {
    path: '/AllNotes',
    name: 'AllNotes',
    component: AllNotes,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/Users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
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