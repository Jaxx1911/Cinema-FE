import { useMutation } from '@tanstack/react-query'
import { orderService } from '@/services/order'
import { toast } from 'react-hot-toast'

export const useCreateOrder = () => {
  const createOrderMutation = useMutation({
    mutationFn: (orderData) => orderService.createOrder(orderData),
    onSuccess: (data) => {
      toast.success('Đặt vé thành công!');
      return data;
    },
    onError: (error) => {
      console.error('Order error:', error);
      toast.error(error?.message || 'Có lỗi xảy ra khi đặt vé. Vui lòng thử lại.');
    }
  })

  return {
    createOrder: createOrderMutation.mutate,
    isCreating: createOrderMutation.isPending,
    error: createOrderMutation.error,
    data: createOrderMutation.data
  }
} 