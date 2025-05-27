import { useMutation, useQuery } from '@tanstack/react-query'
import { orderService } from '@/services/order'
import { toast } from 'react-hot-toast'
import { XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

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

export const useGetOrderWithPayment = (id) => {
  const getOrderWithPaymentQuery = useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrderWithPayment(id)
  })

  return {
    data: getOrderWithPaymentQuery.data,
    isLoading: getOrderWithPaymentQuery.isLoading,
    error: getOrderWithPaymentQuery.error
  }
}

export const useGetOrderFullDetail = (id) => {
  const getOrderFullDetailQuery = useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrderFullDetail(id),
    enabled: !!id
  })

  return {
    data: getOrderFullDetailQuery.data,
    isLoading: getOrderFullDetailQuery.isLoading,
    error: getOrderFullDetailQuery.error
  }
}

export const useDeleteOrder = (id) => {
  const router = useRouter()
  const deleteOrderMutation = useMutation({
    mutationFn: () => orderService.deleteOrder(id),
    onSuccess: () => {
      toast.success(
        'Đơn hàng đã bị huỷ do hết thời gian giữ vé!',
        {
          duration: 5000,
          icon: <XIcon className="w-4 h-4" />
        }
      );
      router.push('/dashboard')
    },
    onError: (error) => {
      console.error('Order error:', error);
      toast.error(error?.message || 'Có lỗi xảy ra khi hủy đơn hàng. Vui lòng thử lại.');
    }
  })  

  return {
    deleteOrder: deleteOrderMutation.mutate,
    isDeleting: deleteOrderMutation.isPending,
    error: deleteOrderMutation.error,
    data: deleteOrderMutation.data
  }
}
