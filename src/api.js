import axios from 'axios'
import { getAuthToken } from './auth'

const api = axios.create({
  baseURL: 'https://dummyjson.com', 
  withCredentials: false 
});

api.interceptors.request.use(config => {
  const token = getAuthToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default api