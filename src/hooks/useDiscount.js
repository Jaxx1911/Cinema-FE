import { useMutation } from "@tanstack/react-query"
import { discountService } from "@/services/discountService"

export const useApplyDiscount = () => {
  return useMutation({
    mutationFn: async (code) => {
      const response = await discountService.getDiscountByCode(code)
      return response
    },
  })
} 