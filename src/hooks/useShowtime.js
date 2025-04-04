import { useQuery, useQueryClient } from '@tanstack/react-query'
import { showtimeService } from '@/services/showtimeService'

export const useGetShowtimeByUserFilter = (cinemaId, movieId, day) => {
    return useQuery({
        queryKey: ['showtimes', cinemaId, movieId, day],
        queryFn: () => showtimeService.getShowtimes(cinemaId, movieId, day),
        enabled: !!cinemaId && !!movieId && !!day,
    })
}

export const useGetShowtimeById = (showtimeId) => {
    return useQuery({
        queryKey: ['showtime', showtimeId],
        queryFn: () => showtimeService.getShowtimeById(showtimeId),
        enabled: !!showtimeId,
    })
}
