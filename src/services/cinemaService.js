import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const cinemaApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const cinemaService = {
    getCinemas: async () => {
        const response = await cinemaApi.get('/cinema')
        return response.data
    },
    getCinemaById: async (id) => {
        const response = await cinemaApi.get(`/cinema/${id}`)
        return response.data
    },
}