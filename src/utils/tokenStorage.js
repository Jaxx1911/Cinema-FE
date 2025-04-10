export const tokenStorage = {
  setTokens: (access_token, refresh_token) => {
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
  },

  getAccessToken: () => {
    if (typeof window !== 'undefined') {
      // This will only run in the client-side (browser)
      console.log(localStorage.getItem('access_token'));
      return localStorage.getItem('access_token');
    } else {
      // Return a fallback or handle server-side logic
      console.log('localStorage is not available on the server');
      return null;
    }
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