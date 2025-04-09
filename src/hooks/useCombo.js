import { useQuery } from '@tanstack/react-query'
import { comboService } from '@/services/comboService'

export const useCombo = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['combos'],
        queryFn: () => comboService.getCombos(),
    })

    return { data, isLoading, error }
}

