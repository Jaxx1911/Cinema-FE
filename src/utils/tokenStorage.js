

export const tokenStorage = {
  setTokens: (access_token, refresh_token) => {
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
  },

  getAccessToken: () => {
    console.log(localStorage.getItem('access_token'));
    return localStorage.getItem('access_token')
  },
  
  getRefreshToken: () => localStorage.getItem('refresh_token'),

  hasTokens: () => {
    return !!localStorage.getItem('access_token') && !!localStorage.getItem('refresh_token')
  },

  clearTokens: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }
} 