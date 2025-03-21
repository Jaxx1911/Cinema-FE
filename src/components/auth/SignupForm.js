import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react"
import OTPForm from "./OTPForm"
import { useAuth } from "@/hooks/useAuth"

export default function SignupForm({ formData, handleChange, showPassword, setShowPassword, toLoginMode }) {
  const [showOTP, setShowOTP] = useState(false)
  const [errors, setErrors] = useState({})
  const { getOTP, signup } = useAuth()

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name?.trim()) {
      newErrors.name = 'Full name is required'
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.terms) {
      newErrors.terms = 'You must agree to the Terms of Service'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      getOTP.mutate(formData.email)
      setShowOTP(true)
    } catch (err) {
      console.error('Failed to get OTP:', err)
      setErrors(prev => ({...prev, general: err.message || "Failed to send verification code"}))
    }
  }

  const handleVerify = async (otp) => {
    try {
      signup.mutate({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        otp
      })
    } catch (err) {
      console.error('Signup failed:', err)
    }
  }

  // Show loading state
  if (getOTP.isLoading) {
    return <div>Sending OTP...</div>
  }

  if (showOTP) {
    return (
      <OTPForm 
        onVerify={handleVerify} 
        isLoading={signup.isLoading}
        error={signup.error}
        email={formData.email}
        toLoginMode={toLoginMode}
      />
    )
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-2">Create account</h2>
      <p className="text-muted-foreground mb-6">Sign up to join BNC</p>

      {getOTP.error && (
        <div className="mb-4 p-3 text-sm text-red-500 bg-transparent rounded-lg">
          {getOTP.error.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label htmlFor="name" className="block text-sm font-medium">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full pl-10 pr-4 py-3 bg-input border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.name ? 'border-red-500' : 'border'
              }`}
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

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

        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="block text-sm font-medium">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter your password again"
              className={`w-full pl-10 pr-4 py-3 bg-input border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.confirmPassword ? 'border-red-500' : 'border'
              }`}
            />
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <div className="flex">
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={formData.terms}
              onChange={handleChange}
              className={`w-4 h-4 bg-input border ${
                errors.terms ? 'border-red-500' : ''
              }`}
              style={{ height: "13px" }}
            />
          </div>
          <label className="flex items-center ml-2 text-sm text-muted-foreground">
            I agree to the{" "}
            <a href="#" className="text-primary hover:underline ml-1 mr-1"> Terms of Service </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline ml-1"> Privacy Policy </a>
          </label>
        </div>
        {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

        <button 
          type="submit" 
          className="primary-button block w-full"
          disabled={getOTP.isLoading}
          onClick={handleSubmit}
        >
          {getOTP.isLoading ? 'Sending OTP...' : 'Create account'}
        </button>
      </form>
    </>
  )
} 