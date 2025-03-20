import { useQuery, useQueryClient } from '@tanstack/react-query'
import { movieService } from '@/services/movieService'

export const useMovie = () => {
    const queryClient = useQueryClient()

    const getNowPlaying = useQuery({
        queryKey: ['nowPlaying'],
        queryFn: movieService.getNowPlaying,
        onSuccess: (data) => {
            queryClient.setQueryData(['nowPlaying'], data)
        },
        onError: (error) => {
            console.error('Error fetching now playing movies:', error)
            throw error
        },
    })
    
    const getComingSoon = useQuery({
        queryKey: ['comingSoon'],
        queryFn: movieService.getComingSoon,
        onSuccess: (data) => {
            queryClient.setQueryData(['comingSoon'], data)
        },
        onError: (error) => {
            console.error('Error fetching coming soon movies:', error)
            throw error
        },
    })

    const getFeaturedMovie = useQuery({
        queryKey: ['featuredMovie'],
        queryFn: movieService.getFeaturedMovie,
    })

    const getMovieDetails = useQuery({
        queryKey: ['movieDetails'], 
        queryFn: movieService.getMovieDetails,
    })

    const getMovieTrailer = useQuery({
        queryKey: ['movieTrailer'],
        queryFn: movieService.getMovieTrailer,
    })

    return {
        getNowPlaying,
        getComingSoon,
        getFeaturedMovie,
        getMovieDetails,
        getMovieTrailer,
    }
}   