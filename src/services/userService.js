import axios from 'axios'
import { tokenStorage } from '@/utils/tokenStorage'
import { FoldHorizontal } from 'lucide-react'

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
        const token = tokenStorage.getAccessToken()
        const response = await userApi.put(`/user`, userData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    },
    getUserOrders: async () => {
        const token = tokenStorage.getAccessToken()
        const response = await userApi.get(`/user/orders`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    },
    getUserPayments: async () => {
        const token = tokenStorage.getAccessToken()
        const response = await userApi.get(`/user/payments`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    },
    changeAvatar: async (file) => {
        console.log(file);
        
        const token = tokenStorage.getAccessToken()
        const response = await userApi.putForm(`/user/avatar`, 
            {
                file: file
            }, {
            headers: {
                'Authorization': `Bearer ${token}`  
            },
            'Content-Type': 'multipart/form-data'
        })
        return response.data
    }
}

export default userService
