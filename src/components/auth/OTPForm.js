import { useState } from 'react'

export default function OTPForm({ onVerify, isLoading, error, email }) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

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

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Verify your email</h2>
        <p className="text-muted-foreground">
          We've sent a verification code to {email}
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
      </form>
    </div>
  )
} 