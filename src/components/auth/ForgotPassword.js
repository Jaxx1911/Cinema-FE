"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Mail, ChevronLeft, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export default function ForgotPassword({ toLoginMode }) {
  const [email, setEmail] = useState("")
  const [step, setStep] = useState(1)
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  const [newPassword, setNewPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")

  const { resetOTP, resetPassword } = useAuth()
  
  // Thêm state để quản lý lỗi
  const [errors, setErrors] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
    verificationCode: "",
    general: ""
  })

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmitEmail = (e) => {
    e.preventDefault()
    
    // Reset errors
    setErrors({...errors, email: "", newPassword: "", confirmPassword: "", general: ""})
    
    // Validate fields
    let isValid = true
    
    if (!email) {
      setErrors(prev => ({...prev, email: "Email is required"}))
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors(prev => ({...prev, email: "Please enter a valid email"}))
      isValid = false
    }
    
    if (!newPassword) {
      setErrors(prev => ({...prev, newPassword: "Password is required"}))
      isValid = false
    } else if (newPassword.length < 8) {
      setErrors(prev => ({...prev, newPassword: "Password must be at least 8 characters"}))
      isValid = false
    }
    
    if (!confirmPassword) {
      setErrors(prev => ({...prev, confirmPassword: "Please confirm your password"}))
      isValid = false
    } else if (newPassword !== confirmPassword) {
      setErrors(prev => ({...prev, confirmPassword: "Passwords do not match"}))
      isValid = false
    }
    
    if (!isValid) return;
    
    resetOTP.mutate(email, {
      onSuccess: () => setStep(2),
      onError: (error) => {
        setErrors(prev => ({...prev, general: "Failed to send verification code"}))
      }
    })
  }

  const handleSendOTP = (e) => {
    e.preventDefault()
    resetOTP.mutate(email, {
      onError: (error) => {
        setErrors(prev => ({...prev, general: error.message || "Failed to send verification code"}))
      }
    })
  }

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode]
      newCode[index] = value
      setVerificationCode(newCode)

      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus()
      }
    }
  }

  const handleSubmitCode = (e) => {
    e.preventDefault()
    
    // Reset errors
    setErrors({...errors, verificationCode: "", general: ""})
    
    if (!verificationCode.every((digit) => digit)) {
      setErrors(prev => ({...prev, verificationCode: "Please enter the complete verification code"}))
      return;
    }
    
    resetPassword.mutate({
      email: email,
      new_password: newPassword,
      otp: verificationCode.join('')
    }, {
      onError: (error) => {
        setErrors(prev => ({...prev, general: "Failed to reset password"}))
      }
    })
  }

  return (
      <>
        <div className="w-full max-w-md">
          <button onClick={toLoginMode} className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to login</span>
          </button>

          <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
          <p className="text-muted-foreground mb-8">
            {step === 1
              ? "Enter your email address to receive a verification code"
              : step === 2
                ? "Enter the verification code sent to your email"
                : "Create a new password for your account"}
          </p>

          {/* Show general error if any */}
          {errors.general && (
            <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4">
              {errors.general}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleSubmitEmail} className="space-y-5">
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
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    className={`w-full pl-10 pr-4 py-3 bg-input border border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="space-y-1">
                <label htmlFor="new-password" className="block text-sm font-medium">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="new-password"
                    className={`w-full px-4 py-3 bg-input border border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary ${errors.newPassword ? 'border-red-500' : ''}`}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Eye className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
                {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="confirm-password" className="block text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className={`w-full px-4 py-3 bg-input border border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
              <button type="submit" className="primary-button" style={{ marginTop: '2rem' }} disabled={resetOTP.isLoading}>
                Send verification code
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmitCode} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Verification Code</label>
                <p className="text-sm text-muted-foreground mb-4">We've sent a 6-digit code to {email}</p>
                <div className="flex justify-between gap-2">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      className={`w-12 h-12 text-center bg-input border border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-lg ${errors.verificationCode ? 'border-red-500' : ''}`}
                    />
                  ))}
                </div>
                {errors.verificationCode && <p className="text-red-500 text-sm mt-1">{errors.verificationCode}</p>}
              </div>

              <div className="text-center">
                <button type="button" className="text-primary hover:underline text-sm cursor-pointer" onClick={handleSendOTP}>
                  Didn't receive a code? Resend
                </button>
              </div>

              <button type="submit" className="primary-button">
                Verify
              </button>
            </form>
          )}
        </div>
      </>
  )
}
