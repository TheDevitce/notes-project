import { useAuthStore } from '@/stores/userData'

export const isAuthenticated = () => {
  return useAuthStore().isAuthenticated
}

export const getAuthUser = () => {
  return useAuthStore().user
}

export const getAuthToken = () => {
  const user = getAuthUser()
  return user?.token || null
}

export const hasRole = (requiredRole) => {
  const user = getAuthUser()
  return user && user.role === requiredRole
}

export const logout = () => {
  useAuthStore().clearUser()
}