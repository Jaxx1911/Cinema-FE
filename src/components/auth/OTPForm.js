import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { ChevronLeft } from 'lucide-react'

export default function OTPForm({ onVerify, isLoading, error, email, toLoginMode }) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const { getOTP } = useAuth()

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    // Focus next input
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onVerify(otp.join(''))
  }

  const handleResendOTP = () => {
    e.preventDefault()
    getOTP.mutate(email)
  }

  return (
    <div className="space-y-4">
      <button onClick={toLoginMode} className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 cursor-pointer">
        <ChevronLeft className="w-5 h-5" />
        <span className="cursor-pointer hover:underline">Back to login</span>
      </button>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Verify your email</h2>
        <p className="text-muted-foreground">
          We've sent a 6-digit code to {email}
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
          {error.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-2">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            />
          ))}
        </div>

        <button 
          type="submit" 
          className="primary-button w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
        <div className="text-center">
          <button type="button" className="text-primary hover:underline text-sm cursor-pointer" onClick={handleResendOTP}>
            Didn't receive a code? Resend
          </button>
        </div>
      </form>
    </div>
  )
} 