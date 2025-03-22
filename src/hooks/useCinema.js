import { useQuery, useQueryClient } from '@tanstack/react-query'
import { cinemaService } from '@/services/cinemaService'

export const useGetCinemas = () => {
    return useQuery({
        queryKey: ['cinemas'],
        queryFn: cinemaService.getCinemas,
    })
}

export const useGetCinemaById = (id) => {
    return useQuery({
        queryKey: ['cinema', id],
        queryFn: () => cinemaService.getCinemaById(id),
    })
}