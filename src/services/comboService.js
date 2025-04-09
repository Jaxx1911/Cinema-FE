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

export const comboService = {
    getCombos: async () => {
        const response = await userApi.get('/combo')
        return response.data
    },
}