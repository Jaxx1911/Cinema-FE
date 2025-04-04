import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const showtimeApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const showtimeService = {
    getShowtimes: async (cinemaId, movieId, day) => {
        const response = await showtimeApi.get(`/showtime?cinema_id=${cinemaId}&movie_id=${movieId}&day=${day}`)
        return response.data
    },   
    getShowtimeById: async (showtimeId) => {
        const response = await showtimeApi.get(`/showtime/${showtimeId}`)
        return response.data
    }
}
