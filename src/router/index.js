import { createRouter, createWebHashHistory  } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import Notes from '../views/Notes.vue'
import AllNotes from '../views/AllNotes.vue'
import Users from '../views/Users.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage
  },
  {
    path: '/Notes',
    name: 'Notes',
    component: Notes
  },
  {
    path: '/AllNotes',
    name: 'AllNotes',
    component: AllNotes
  },
  {
    path: '/Users',
    name: 'Users',
    component: Users
  },
]

const router = createRouter({
  history: createWebHashHistory (),
  routes
})

export default router