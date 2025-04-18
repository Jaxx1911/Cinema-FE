import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/services/authService'
import { useRouter } from 'next/navigation'
import { tokenStorage } from '@/utils/tokenStorage'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const getOTP = useMutation({
    mutationFn: (email) => authService.getOTP(email),
    onSuccess: (data) => {
      // Handle successful OTP request
      console.log('OTP sent successfully')
    },
    onError: (error) => {
      console.error('Get OTP error:', error)
      throw error
    },
  })

  const signup = useMutation({
    mutationFn: (userData) => authService.signup(userData),
    onSuccess: (data) => {
      if (data.body.token.access_token && data.body.token.refresh_token) {
        // Store tokens
        tokenStorage.setTokens(data.body.token.access_token, data.body.token.refresh_token)
        // Set auth header
        authService.setAuthHeader(data.body.token.access_token)
        // Redirect to dashboard
        router.push('/dashboard')
      }
    },
    onError: (error) => {
      console.error('Signup error:', error)
      throw error
    },
  })

  const verifyOTP = useMutation({
    mutationFn: ({ email, otp }) => authService.verifyOTP({ email, otp }),
    onSuccess: (data) => {
      // Handle successful verification
      if (data.token) {
        authService.setAuthHeader(data.token)
        router.push('/dashboard')
      }
    },
    onError: (error) => {
      console.error('OTP verification error:', error)
      throw error
    },
  })

  const resetOTP = useMutation({
    mutationFn: (email) => authService.resetOTP(email),
    onError: (error) => {
      console.error('Reset OTP error:', error)
      throw error
    },
  })

  const login = useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (data) => {
      console.log(data)
      if (data.body.token.access_token && data.body.token.refresh_token) {
        // Store tokens
        tokenStorage.setTokens(data.body.token.access_token, data.body.token.refresh_token)
        // Set auth header
        authService.setAuthHeader(data.body.token.access_token)
        // Redirect to dashboard
        router.push('/dashboard')
      } else {
        return {
          error: {
            message: 'Login failed: Invalid response from server'
          }
        }
      }
    },
  })

  const logout = () => {
      // Clear auth header and tokens
      authService.removeAuthHeader()
      // Clear any cached queries
      queryClient.clear()
      // Redirect to login
      router.push('/')
  }

  const resetPassword = useMutation({
    mutationFn: (credentials) => authService.resetPassword(credentials),
    onSuccess: () => {
      window.location.reload()
    },
    onError: (error) => {
      console.error('Reset password error:', error)
      throw error
    },
  })

  // Function to check if user is authenticated
  const isAuthenticated = () => {
    return tokenStorage.hasTokens()
  }

  // Function to handle auth redirect
  const requireAuth = () => {
    if (!isAuthenticated()) {
      router.replace('/')
      return false
    }
    return true
  }
  
  return {
    getOTP: {
      mutate: getOTP.mutate,
      isLoading: getOTP.isPending,
      error: getOTP.error,
    },
    signup: {
      mutate: signup.mutate,
      isLoading: signup.isPending,
      error: signup.error,
    },
    verifyOTP: {
      mutate: verifyOTP.mutate,
      isLoading: verifyOTP.isPending,
      error: verifyOTP.error,
    },
    resetOTP: {
      mutate: resetOTP.mutate,
      isLoading: resetOTP.isPending,
      error: resetOTP.error,
    },
    login: {
      mutate: login.mutate,
      isLoading: login.isPending,
      error: login.error,
    },
    resetPassword: {
      mutate: resetPassword.mutate,
      isLoading: resetPassword.isPending,
      error: resetPassword.error,
    },
    logout,
    isAuthenticated,
    requireAuth,
  }
} 