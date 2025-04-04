import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const seatApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const seatService = {
    getSeatsByRoomId: async (roomId) => {
        const response = await seatApi.get(`/seat/room/${roomId}`)
        return response.data
    }
}