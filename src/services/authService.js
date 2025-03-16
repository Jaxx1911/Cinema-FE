const LOGIN_API_URL = 'http://localhost:8000/api/auth/login';

export const authService = {
  login: async (credentials) => {
    const response = await fetch(LOGIN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  },
}; 