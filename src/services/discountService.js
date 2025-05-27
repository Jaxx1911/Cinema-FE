import axios from 'axios'
import { tokenStorage } from '@/utils/tokenStorage'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const discountApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const discountService = {
    getDiscountByCode: async (code) => {
        const token = tokenStorage.getAccessToken()
        const response = await discountApi.get(`/discount?code=${code}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    },
}

export default discountService
