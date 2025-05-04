import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import userService from "@/services/userService"

export function useUserInfo() {
    return useQuery({
        queryKey: ["userInfo"],
        queryFn: userService.getUserDetail,
    })
}

export function useListUser() {
    return useQuery({
        queryKey: ["listUser"],
        queryFn: userService.getListUser,
    })
}

export function useUpdateUser(userData) {
    return useMutation({
        mutationFn: userService.updateUser(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userInfo"] })
        },
    })
}

export function useGetUserOrders() {
    return useQuery({
        queryKey: ["userOrders"],
        queryFn: userService.getUserOrders,
    })
}

export function useGetUserPayments() {
    return useQuery({
        queryKey: ["userPayments"],
        queryFn: userService.getUserPayments,
    })
}
