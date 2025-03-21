import { useState } from "react"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export default function LoginForm({ formData, handleChange, showPassword, setShowPassword, forgotPassword }) {
  const [errors, setErrors] = useState({})
  const { login } = useAuth()

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    login.mutate({
      email: formData.email,
      password: formData.password
    }, {
      onError: (err) => {
        if (err.status === 401) {
          setErrors(prev => ({...prev, general: "Wrong login credentials"}))
        } else {
          setErrors(prev => ({...prev, general: "Login failed. Please try again."}))
        }
      }
    })
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
      <p className="text-muted-foreground mb-6">Sign in to continue to BNC</p>

      {errors.general && (
        <div className="mb-4 p-3 text-sm text-red-500 bg-transparent rounded-lg">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className="w-5 h-5 text-muted-foreground" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full pl-10 pr-4 py-3 bg-input border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.email ? 'border-red-500' : 'border'
              }`}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="space-y-1">
          <div className="flex justify-between">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <button onClick={forgotPassword} className="text-sm text-primary hover:underline cursor-pointer">
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full pl-10 pr-12 py-3 bg-input border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.password ? 'border-red-500' : 'border'
              }`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Eye className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="primary-button block w-full text-center cursor-pointer"
          style={{ marginTop: '2rem' }}
          disabled={login.isLoading}
        >
          {login.isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </>
  )
} 