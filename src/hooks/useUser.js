import { useQuery } from "@tanstack/react-query"
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

export function useUpdateUser(userId) {
    return useMutation({
        mutationFn: userService.updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userInfo"] })
        },
    })
}

