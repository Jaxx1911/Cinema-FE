import axios from 'axios'
import { tokenStorage } from '@/utils/tokenStorage'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const movieApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const movieService = {
    getNowPlaying: async () => {
        const response = await movieApi.get('/movie?status=new')
        return response.data
    },
    getComingSoon: async () => {
        const response = await movieApi.get('/movie?status=incoming')
        return response.data
    },
    getFeaturedMovie: async () => {
        const response = await movieApi.get('/movies/featured')
        return response.data
    },
    getMovieDetails: async (movieId) => {
        const response = await movieApi.get(`/movie/${movieId}`)
        return response.data
    },
    getMovieTrailer: async (movieId) => {
        const response = await movieApi.get(`/movies/${movieId}/trailer`)
        return response.data
    },
}
