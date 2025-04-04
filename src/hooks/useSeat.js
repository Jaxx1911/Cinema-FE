import { useQuery } from '@tanstack/react-query'
import { seatService } from '@/services/seatService'

export const useGetSeatsByRoomId = (roomId) => {
    return useQuery({
        queryKey: ['seats', roomId],
        queryFn: () => seatService.getSeatsByRoomId(roomId),
    })
}

