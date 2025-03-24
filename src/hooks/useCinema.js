import { useQuery, useQueryClient } from '@tanstack/react-query'
import { cinemaService } from '@/services/cinemaService'

export const useGetCinemas = (city) => {
    return useQuery({
        queryKey: ['cinemas', city],
        queryFn: () => cinemaService.getCinemas(city),
    })
}

export const useGetCinemaById = (id) => {
    return useQuery({
        queryKey: ['cinema', id],
        queryFn: () => cinemaService.getCinemaById(id),
    })
}