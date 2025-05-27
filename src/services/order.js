import axios from 'axios'
import { tokenStorage } from '@/utils/tokenStorage'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const orderApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        
    },
})


export const orderService = {
  createOrder: async (orderData) => {
    try {
        const token = tokenStorage.getAccessToken()
        const response = await orderApi.post(`/order`, orderData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },
  getOrderWithPayment: async (orderId) => {
    try {
      const token = tokenStorage.getAccessToken()
      const response = await orderApi.get(`/order/qr/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },
  getOrderFullDetail: async (orderId) => {
    try {
      const token = tokenStorage.getAccessToken()
      const response = await orderApi.get(`/order/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },
  deleteOrder: async (orderId) => {
    try {
      const token = tokenStorage.getAccessToken()
      const response = await orderApi.delete(`/order/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
} 