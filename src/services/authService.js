import axios from 'axios'
import { tokenStorage } from '@/utils/tokenStorage'
import { userApi } from './userService'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const authService = {
  signup: async ({ name, email, password, otp }) => {
    const response = await authApi.post('/auth/signup', {
      name,
      email,
      password,
      otp
    })
    
    // If signup successful, store tokens
    if (response.data.access_token && response.data.refresh_token) {
      tokenStorage.setTokens(
        response.data.access_token,
        response.data.refresh_token
      )
      this.setAuthHeader(response.data.access_token)
    }
    
    return response.data
  },

  getOTP: async (email) => {
    const response = await authApi.get(`/auth/otp/${email}`)
    return response.data
  },

  resetOTP: async (email) => {
    const response = await authApi.get(`/auth/reset-otp/${email}`)
    return response.data
  },

  login: async (credentials) => {
    const response = await authApi.post('/auth/login', credentials)
    
    // If login successful, store tokens
    if (response.data.access_token && response.data.refresh_token) {
      tokenStorage.setTokens(
        response.data.access_token,
        response.data.refresh_token
      )
      authService.setAuthHeader(response.data.access_token)
    }
    
    return response.data
  },

  resetPassword: async (credentials) => {
    const response = await authApi.post(`/auth/reset-password`, credentials)
    return response.data
  },

  changePassword: async (credentials) => {
    const token = tokenStorage.getAccessToken()
    const response = await authApi.post(`/auth/change-password`, credentials, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data
  },

  // Add interceptor to handle token
  setAuthHeader: (token) => {
    authApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
  },

  removeAuthHeader: () => {
    delete authApi.defaults.headers.common['Authorization']
    tokenStorage.clearTokens()
  },
} 