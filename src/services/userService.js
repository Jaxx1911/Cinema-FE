import axios from 'axios'
import { tokenStorage } from '@/utils/tokenStorage'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const userApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        
    },
})

export const userService = {
    getListUser: async () => {
        const response = await userApi.get('/user')
        return response.data
    },
    getUserDetail: async () => {
        const token = tokenStorage.getAccessToken()
        const response = await userApi.get(`/user/detail`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    },
    updateUser: async (userData) => {
        const response = await userApi.put(`/user/${userData.id}`, userData)
        return response.data
    },
    deleteUser: async (userId) => {
        const response = await userApi.delete(`/user/${userId}`)
        return response.data
    },
}

export default userService
