import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (data) => {
      // Handle successful login
      // For example, store the token in localStorage
      localStorage.setItem('token', data.token);
    },
    onError: (error) => {
      // Handle login error
      console.error('Login error:', error);
    },
  });
}; 