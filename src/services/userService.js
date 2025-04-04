import axios from 'axios'
import { tokenStorage } from '@/utils/tokenStorage'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const userApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenStorage.getAccessToken()}`,
    },
})

export const userService = {
    getListUser: async () => {
        console.log(userApi.defaults.headers.Authorization)
        const response = await userApi.get('/user')
        return response.data
    },
    getUserDetail: async () => {
        const response = await userApi.get(`/user/detail`)
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
