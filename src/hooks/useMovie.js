import { useQuery, useQueryClient } from '@tanstack/react-query'
import { movieService } from '@/services/movieService'

export const useNowPlaying = () => {
    return useQuery({
        queryKey: ["nowPlaying"],
        queryFn: movieService.getNowPlaying,
        onError: (error) => {
            console.error("Error fetching now playing movies:", error)
        },
    })
}

export const useComingSoon = () => {
    return useQuery({
        queryKey: ["comingSoon"],
        queryFn: movieService.getComingSoon,
        onError: (error) => {
            console.error("Error fetching coming soon movies:", error)
        },
    })
}

export const useFeaturedMovie = () => {
    return useQuery({
        queryKey: ["featuredMovie"],
        queryFn: movieService.getFeaturedMovie,
    })
}

export const useMovieDetails = (movieId) => {
    return useQuery({
        queryKey: ["movieDetails", movieId],
        queryFn: () => movieService.getMovieDetails(movieId),
        enabled: !!movieId, // Chỉ gọi API nếu movieId có giá trị
    })
}

export const useMovieTrailer = (movieId) => {
    return useQuery({
        queryKey: ["movieTrailer", movieId],
        queryFn: () => movieService.getMovieTrailer(movieId),
        enabled: !!movieId, // Chỉ gọi API nếu movieId có giá trị
    })
}