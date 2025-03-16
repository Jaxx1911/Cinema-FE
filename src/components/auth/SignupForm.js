import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react"

export default function SignupForm({ formData, handleChange, showPassword, setShowPassword }) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-2">Create account</h2>
      <p className="text-muted-foreground mb-6">Sign up to join MBCKing</p>

      <form className="space-y-5">
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
              className="w-full pl-10 pr-4 py-3 bg-input border border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
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
              className="w-full pl-10 pr-4 py-3 bg-input border border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
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
              className="w-full pl-10 pr-12 py-3 bg-input border border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
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
              className="w-full pl-10 pr-4 py-3 bg-input border border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex">
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 bg-input border"
              style={{
                height: "13px",
            }}
            />
          </div>
          <label className="flex items-center ml-2 text-sm text-muted-foreground">
            I agree to the{" "}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </label>
        </div>

        <Link href="/dashboard" className="primary-button block text-center">
          Create account
        </Link>
      </form>
    </>
  )
} 